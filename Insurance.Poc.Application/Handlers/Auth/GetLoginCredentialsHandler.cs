using Insurance.Poc.Application.Queries.Identity;
using Insurance.Poc.Application.Responses.Auth;
using Insurance.Poc.Core.Services;
using MediatR;

namespace Insurance.Poc.Application.Handlers.Auth;

public class GetLoginCredentialsHandler(ICachingInMemoryService cachingInMemoryService) : IRequestHandler<GetLoginCredentialsQuery, ResponseLogin>
{
    private readonly ICachingInMemoryService _cachingInMemoryService = cachingInMemoryService;

    public async Task<ResponseLogin> Handle(GetLoginCredentialsQuery request, CancellationToken cancellationToken)
    {
        return _cachingInMemoryService.Get<ResponseLogin>(request.Token);
    }
}