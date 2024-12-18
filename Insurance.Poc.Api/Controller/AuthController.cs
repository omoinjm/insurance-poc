using System.Net;
using Insurance.Poc.Application.Commands.Users.IdentityCommands;
using Insurance.Poc.Application.Responses.Auth;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Insurance.Poc.Api.Controller;

public class AuthController(IMediator mediator, ILogger logger) : ApiController
{
    private readonly IMediator _mediator = mediator;
    private readonly ILogger _logger = logger;

    [AllowAnonymous]
    [HttpPost]
    [Route("Login")]
    [ProducesResponseType(typeof(ResponseLogin), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> Login(CreateLoginCommand requestLogin)
    {
        _logger.LogInformation($"Login by {requestLogin.Email}");

        var result = await _mediator.Send(requestLogin);

        _logger.LogInformation($"Login result for {requestLogin.Email} {result.Success}");

        return Ok(result);
    }

    [ApiExplorerSettings(IgnoreApi = true)]
    [Route("Register")]
    [HttpPost]
    [ProducesResponseType(typeof(CreateRegisterCommand), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> Register(CreateRegisterCommand requestRegister)
    {

        var result = await _mediator.Send(requestRegister);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpGet]
    [Route("Ping")]
    [ProducesResponseType(typeof(object), (int)HttpStatusCode.OK)]
    public IActionResult Ping()
    {
        return Ok(new { message = "Pong Pipeline", timestamp = DateTime.Now });
    }

}