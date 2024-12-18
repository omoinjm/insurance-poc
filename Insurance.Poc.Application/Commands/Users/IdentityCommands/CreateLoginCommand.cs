using Insurance.Poc.Application.Responses.Auth;
using MediatR;

namespace Insurance.Poc.Application.Commands.Users.IdentityCommands;

public class CreateLoginCommand : BaseRequest, IRequest<ResponseLogin>
{
    public string Email { get; set; }
    public string Password { get; set; }
}