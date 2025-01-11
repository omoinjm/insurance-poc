using Insurance.Poc.Core.Enum;

namespace Insurance.Poc.Application.Responses.Application;

/// <summary>
/// This is the response object we expect to be returned from the user interface.
/// </summary>
public class BaseResponse
{
    public object? Model { get; set; }
    public bool ShowError { get; set; }
    public bool IsError { get; set; }
    public List<string> ErrorList { get; set; }
    public string ErrorTitle { get; set; }
    public EnumValidationDisplay ErrorDisplay { get; set; }
    public bool ShowSuccess { get; set; }
    public string SuccessMessage { get; set; }
    public bool IsException { get; set; }
    public bool ShowException { get; set; }

    public BaseResponse()
    {
        ShowError = true;
        IsError = false;
        ErrorList = [];
        ErrorDisplay = EnumValidationDisplay.Popup;
        ShowSuccess = false;
        SuccessMessage = "Completed Successfully";
        IsException = false;
        ErrorTitle = "An error has occured";
        ShowException = true;
    }
}
