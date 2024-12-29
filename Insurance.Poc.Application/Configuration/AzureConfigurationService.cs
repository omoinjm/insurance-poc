using Insurance.Poc.Core.Services;

namespace Insurance.Poc.Application.Configuration;

public class AzureConfigurationService : IConfigurationService
{
    public string ConnectionString()
    {
        return Environment.GetEnvironmentVariable("SQLCONNSTR_POSTGRES_CONNECTION_STRING")!;
    }
}
