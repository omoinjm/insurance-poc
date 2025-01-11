using Insurance.Poc.Application.Responses.Application;
using MediatR;

namespace Insurance.Poc.Application.Commands.Users.IdentityCommands;

public class CreateLoginCommand : BaseRequest, IRequest<BaseResponse>
{
    public string Email { get; set; }
    public string Password { get; set; }
}