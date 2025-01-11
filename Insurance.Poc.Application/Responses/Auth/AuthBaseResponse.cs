using System.Text.Json.Serialization;

namespace Insurance.Poc.Application.Responses.Auth;

public class AuthBaseResponse
{
    [JsonIgnore]
    public bool Success { get; set; }

    [JsonIgnore]
    public List<string> MessageList { get; set; }

    public AuthBaseResponse()
    {
        MessageList = [];
    }
}
