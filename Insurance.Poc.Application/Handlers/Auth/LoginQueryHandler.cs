using System.Security.Claims;
using Insurance.Poc.Core.Repositories;
using Insurance.Poc.Application.Commands.Users.IdentityCommands;
using Insurance.Poc.Application.Responses.Auth;
using Insurance.Poc.Core.Entities;
using Insurance.Poc.Core.Services;
using Insurance.Poc.Core.Utils;
using MediatR;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Insurance.Poc.Application.Handlers.Auth;

public class LoginQueryHandler(IConfiguration configuration, IUserRepository userRepository, ICachingInMemoryService cachingInMemoryService) : IRequestHandler<CreateLoginCommand, ResponseLogin>
{
    private readonly IConfiguration _configuration = configuration;
    private readonly IUserRepository _userRepository = userRepository;
    private readonly ICachingInMemoryService _cachingInMemoryService = cachingInMemoryService;

    public async Task<ResponseLogin> Handle(CreateLoginCommand request, CancellationToken cancellationToken)
    {
        UserEntity? existingUser = await _userRepository.GetUserByEmail(request.Email)
            ?? throw new ArgumentException("The provided email or username is invalid.", nameof(request.Email));

        // JM: We don't have salted & hashed password in the db
        // if (!(request.Password == existingUser.Password)) throw new UnauthorizedAccessException("Password is incorrect.");

        // TODO: Create salted & hashed field in database
        bool isPasswordVerified = CryptoUtil.VerifyPassword(request.Password, existingUser.Salt, existingUser.Password);

        if (!isPasswordVerified) throw new UnauthorizedAccessException("Password is incorrect.");

        List<Claim> claimList =
        [
            new Claim(ClaimTypes.Name, existingUser.Email!),
            new Claim(ClaimTypes.Role, existingUser.Role!),
        ];

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["SecretKey"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expireDate = DateTime.UtcNow.AddDays(1);
        var expiryDate = DateTime.Now.AddDays(1);
        int timeStamp = DateUtil.ConvertToTimeStamp(expireDate);

        var token = new JwtSecurityToken(
            claims: claimList,
            notBefore: DateTime.UtcNow,
            expires: expireDate,
            signingCredentials: creds
        );

        var responseLogin = new ResponseLogin
        {
            Success = true,
            UserId = existingUser.Id,
            Role = existingUser.Role!,
            Username = existingUser.Username!,
            Email = existingUser.Email!,
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            ExpireDate = expiryDate,
            TimeStamp = timeStamp
        };

        //set the user with token and expiry date
        existingUser.Token = responseLogin.Token;
        existingUser.ExpiryDateTime = expiryDate;
        existingUser.LoginTimeStamp = DateTime.Now;
        existingUser.UpdatedBy = $"{existingUser.Name} {existingUser.Surname}";

        _cachingInMemoryService.Set<string>("token", existingUser.Token, TimeSpan.FromDays(1));
        _cachingInMemoryService.Set<int?>("loggedInUserId", existingUser.Id, TimeSpan.FromDays(1));

        _cachingInMemoryService.Set<ResponseLogin>(existingUser.Token, responseLogin, TimeSpan.FromDays(1));

        //update the user with token and expiry date
        await _userRepository.UpdateUser(existingUser);

        return responseLogin;
    }
}