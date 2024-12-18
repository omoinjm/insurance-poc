using Insurance.Poc.Api.Exceptions.CustomException;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Insurance.Poc.Api.Exceptions.GlobalException;

public class GlobalExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        var problemDetails = new ProblemDetails
        {
            Title = ErrorTitleProvider.GetErrorTitle(exception),
            Detail = exception.Message,
            Type = exception.GetType().Name,
            Instance = httpContext.Request.Path.ToString(),
            Status = httpContext.Response.StatusCode,
            Extensions =
                {
                    ["traceID"] = Guid.NewGuid().ToString(), // Add the traceID here
                    ["raw"] = exception.ToString()
                }
        };

        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

        return true;
    }
}