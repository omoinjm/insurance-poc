using Insurance.Poc.Application.Responses.Auth;
using MediatR;

namespace Insurance.Poc.Application.Commands.Users.IdentityCommands;

public class CreateRegisterCommand : BaseRequest, IRequest<ResponseRegister>
{
    public string Email { get; set; }
    public string Username { get; set; }
    public string Role { get; set; }
    public string Password { get; set; }
    // public int? UserId { get; set; }
    // public int? CompanyId { get; set; }
}