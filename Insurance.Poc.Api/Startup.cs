using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Insurance.Poc.Core.Repositories;
using Insurance.Poc.Infrastructure.Repositories;
using Insurance.Poc.Api.dto;
using Insurance.Poc.Application.Handlers.Users;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Insurance.Poc.Core.Services;
using Insurance.Poc.Infrastructure.Services;
using Insurance.Poc.Application.Configuration;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Diagnostics;
using Insurance.Poc.Api.Exceptions.GlobalException;

namespace Insurance.Poc.Api;

public class Startup(IConfiguration configuration, IWebHostEnvironment env)
{
    public IConfiguration Configuration = configuration;
    private readonly IWebHostEnvironment _env = env;

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["SecretKey"]))
                };

                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                        {
                            context.Response.Headers.Add("Token-Expired", "true");
                        }
                        return Task.CompletedTask;
                    }
                };
            });

        services.AddSwaggerGen(setup =>
        {
            // Include 'SecurityScheme' to use JWT Authentication
            var jwtSecurityScheme = new OpenApiSecurityScheme
            {
                BearerFormat = "JWT",
                Name = "JWT Authentication",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = JwtBearerDefaults.AuthenticationScheme,
                Description = "Place your JWT Bearer token in the Text-Box below.",

                Reference = new OpenApiReference
                {
                    Id = JwtBearerDefaults.AuthenticationScheme,
                    Type = ReferenceType.SecurityScheme
                }
            };

            setup.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

            setup.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                { jwtSecurityScheme, Array.Empty<string>() }
            });

        });

        services.AddCors(options => options.AddPolicy("ApiCorsPolicy", builder =>
        {
            builder
                .WithOrigins(
                    "https://insurance-poc-ecru.vercel.app",
                    "http://localhost:4200",
                    "http://localhost:4201",
                    "http://127.0.0.1:4200" // Add this line
                )
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        }));

        services.AddMemoryCache();
        services.AddControllers();
        services.AddApiVersioning();
        services.AddHealthChecks();
        services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new OpenApiInfo { Title = "Insurance Poc API", Version = "v1" }); });

        //DI
        var serviceProvider = services.BuildServiceProvider();

        var logger = serviceProvider.GetService<ILogger<ApplicationLogs>>();

        services.AddSingleton(typeof(ILogger), logger);
        services.AddSingleton<ILoggerFactory, LoggerFactory>();
        services.AddSingleton(typeof(ILogger<>), typeof(Logger<>));

        // JM: Register the global exception handler
        services.AddSingleton<IExceptionHandler, GlobalExceptionHandler>();

        // Add Azure Repository Service
        services.AddAutoMapper(typeof(Startup));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetUsersHandler).Assembly));

        //Repositories
        services.AddScoped<IUserRepository, DBRepository>();
        services.AddScoped<IMenuRepository, DBRepository>();
        services.AddScoped<ILookupRepository, DBRepository>();

        //service cache
        services.AddScoped<ICachingInMemoryService, CachingInMemoryService>();

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme);

        if (_env.IsProduction()) services.AddSingleton<IConfigurationService, AzureConfigurationService>();

        if (_env.IsDevelopment()) services.AddSingleton<IConfigurationService, LocalConfigurationService>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Catalog.API v1"));
        }

        // This setup allows for centralized handling of exceptions in an ASP.NET Core application,
        // ensuring that all unhandled exceptions are captured and processed according to the application's error handling logic.
        app.UseExceptionHandler((Action<IApplicationBuilder>)(errorApp =>
        {
            errorApp.Run((RequestDelegate)(async context =>
            {
                var exceptionHandlerFeature = context.Features.Get<IExceptionHandlerFeature>();
                var exception = exceptionHandlerFeature?.Error;

                if (exception != null)
                {
                    var handler = context.RequestServices.GetRequiredService<IExceptionHandler>();
                    await handler.TryHandleAsync(context, exception, context.RequestAborted);
                }
            }));
        }));

        app.UseHsts();

        app.UseAuthentication();
        app.UseRouting();
        app.UseStaticFiles();
        app.UseAuthorization();
        app.UseCors("ApiCorsPolicy");
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapHealthChecks("/health", new HealthCheckOptions()
            {
                Predicate = _ => true,
                ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
            });
        });
    }
}
