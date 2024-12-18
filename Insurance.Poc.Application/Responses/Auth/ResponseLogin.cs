using System.Text.Json.Serialization;
using Insurance.Poc.Core.Auth;

namespace Insurance.Poc.Application.Responses.Auth;

public class ResponseLogin : BaseResponse, IUserInfo
{
    public string Email { get; set; }
    public string Username { get; set; }
    public string Token { get; set; }
    public DateTime ExpireDate { get; set; }

    [JsonIgnore]
    public int? UserId { get; set; }

    [JsonIgnore]
    public string Role { get; set; }

    public int TimeStamp { get; set; }
    public bool IsLoggedIn { get; set; }
    public string LoginMessage { get; set; }
}
