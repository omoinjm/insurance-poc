using System.Text.Json;
using Insurance.Poc.Application.Responses.Application;
using Insurance.Poc.Core.Enum;

namespace Insurance.Poc.Application.Handlers.Base;

public abstract class HandlerBase
{
    protected BaseResponse SuccessResponse(
        dynamic model,
        EnumValidationDisplay errorDisplay = EnumValidationDisplay.Popup,
        bool showSuccess = false,
        string successMessage = "Success",
        bool showError = true)
    {
        return new BaseResponse()
        {
            Model = model,
            ErrorDisplay = errorDisplay,
            IsError = !model.Success,
            ErrorList = model.MessageList,
            ShowSuccess = showSuccess,
            SuccessMessage = successMessage,
            ShowError = showError
        };
    }

}