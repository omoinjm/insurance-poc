using System.Text.Json.Serialization;
using Insurance.Poc.Core.Auth;

namespace Insurance.Poc.Application.Responses.Auth;

public class ResponseLogin : AuthBaseResponse, IUserInfo
{
    [JsonIgnore]
    public int? UserId { get; set; }

    [JsonIgnore]
    public string Role { get; set; }

    public string Email { get; set; }
    public string Username { get; set; }
    public string Token { get; set; }
    public DateTime ExpireDate { get; set; }
    public int TimeStamp { get; set; }
    public bool IsLoggedIn { get; set; }
}
