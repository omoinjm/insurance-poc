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
using Insurance.Poc.Application.Handlers.Base;
using Insurance.Poc.Application.Responses.Application;

namespace Insurance.Poc.Application.Handlers.Auth;

public class LoginQueryHandler(IConfiguration configuration, IUserRepository userRepository, ICachingInMemoryService cachingInMemoryService)
    : HandlerBase, IRequestHandler<CreateLoginCommand, BaseResponse>
{
    private readonly IConfiguration _configuration = configuration;
    private readonly IUserRepository _userRepository = userRepository;
    private readonly ICachingInMemoryService _cachingInMemoryService = cachingInMemoryService;

    public ResponseLogin Data = new();

    public async Task<BaseResponse> Handle(CreateLoginCommand request, CancellationToken cancellationToken)
    {
        var existingUser = await _userRepository.GetUserByEmail(request.Email);
        if (existingUser == null)
            Data.MessageList.Add("The provided email or username is invalid."); Data.Success = false;

        bool isPasswordVerified = CryptoUtil.VerifyPassword(request.Password, existingUser?.Salt!, existingUser?.Password!);
        if (!isPasswordVerified)
            Data.MessageList.Add("Password is incorrect."); Data.Success = false;

        Data = MapResponseLogin(existingUser!, GenerateJwtToken(existingUser!));

        SetUserInCache(existingUser!, Data);

        await _userRepository.UpdateUser(existingUser!);

        return SuccessResponse(Data, 0, true, "Logged in successfully!");
    }

    #region Helper methods
    private string GenerateJwtToken(UserEntity existingUser)
    {
        var claimList = new List<Claim>
        {
            new Claim(ClaimTypes.Name, existingUser.Email!),
            new Claim(ClaimTypes.Role, existingUser.Role!)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["SecretKey"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expireDate = DateTime.UtcNow.AddDays(1);

        var token = new JwtSecurityToken(
            claims: claimList,
            notBefore: DateTime.UtcNow,
            expires: expireDate,
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private ResponseLogin MapResponseLogin(UserEntity existingUser, string token)
    {
        var expiryDate = DateTime.Now.AddDays(1);
        int timeStamp = DateUtil.ConvertToTimeStamp(expiryDate);

        Data.UserId = existingUser.Id;
        Data.Role = existingUser.Role ?? string.Empty;
        Data.Username = existingUser.Username ?? string.Empty;
        Data.Email = existingUser.Email ?? string.Empty;
        Data.Token = token;
        Data.ExpireDate = expiryDate;
        Data.TimeStamp = timeStamp;

        return Data;
    }


    private void SetUserInCache(UserEntity existingUser, ResponseLogin responseLogin)
    {
        _cachingInMemoryService.Set("token", responseLogin.Token, TimeSpan.FromDays(1));
        _cachingInMemoryService.Set("loggedInUserId", existingUser.Id, TimeSpan.FromDays(1));
        _cachingInMemoryService.Set(responseLogin.Token, responseLogin, TimeSpan.FromDays(1));
    }
    #endregion
}