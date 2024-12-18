using Insurance.Poc.Core.Services;
using Microsoft.Extensions.Configuration;

namespace Insurance.Poc.Application.Configuration;

public class LocalConfigurationService(IConfiguration configuration) : IConfigurationService
{
    private readonly IConfiguration _configuration = configuration;

    public string ConnectionString()
    {
        return _configuration.GetValue<string>("ConnectionString:PostgresConnectionString")!;
    }
}
