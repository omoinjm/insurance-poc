namespace Insurance.Poc.Application.Responses.General;

public class UpdateResponse
{
    public bool IsSuccess { get; set; }
    public string Error { get; set; }
    public UpdateResponse()
    {
        IsSuccess = false;
        Error = string.Empty;
    }
}