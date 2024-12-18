namespace Insurance.Poc.Application.Responses.General;

public class CreateResponse
{
    public int? ReturnRecordId { get; set; }
    public bool IsSuccess { get; set; }
    public string Error { get; set; }

    public CreateResponse()
    {
        IsSuccess = false;
        Error = string.Empty;
        ReturnRecordId = 0;
    }

}
