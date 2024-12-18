using Insurance.Poc.Core.Repositories;
using Insurance.Poc.Application.Commands.Users.IdentityCommands;
using Insurance.Poc.Application.Responses.Auth;
using Insurance.Poc.Core.Entities;
using Insurance.Poc.Core.Utils;
using MediatR;
using Microsoft.Extensions.Configuration;

namespace Insurance.Poc.Application.Handlers.Auth;

public class RegisterQueryHandler(IConfiguration configuration, IUserRepository userRepository) : IRequestHandler<CreateRegisterCommand, ResponseRegister>
{
    private readonly IConfiguration _configuration = configuration;
    private readonly IUserRepository _userRepository = userRepository;

    public async Task<ResponseRegister> Handle(CreateRegisterCommand request, CancellationToken cancellationToken)
    {
        var existingUser = await _userRepository.GetUserByEmail(request.Email);

        if (existingUser != null) throw new InvalidOperationException("Email is already in use");

        var email = request.Email;
        var salt = CryptoUtil.GenerateSalt();
        var password = request.Password;
        var hashedPassword = CryptoUtil.HashMultiple(password, salt);

        var user = new UserEntity
        {
            Email = email,
            Salt = salt,
            Password = hashedPassword,
            Role = request.Role
        };

        await _userRepository.CreateUser(user);

        var responseRegister = new ResponseRegister { Success = true, MessageList = ["User successfully created!"] };

        return responseRegister;
    }
}