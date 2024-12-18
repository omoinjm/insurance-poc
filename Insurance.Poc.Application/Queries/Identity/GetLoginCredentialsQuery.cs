using Insurance.Poc.Application.Responses.Auth;
using MediatR;

namespace Insurance.Poc.Application.Queries.Identity;

public class GetLoginCredentialsQuery : IRequest<ResponseLogin>
{
    public string Token { get; set; }
}