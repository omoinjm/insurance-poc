using System.Net;
using Insurance.Poc.Application.Commands.General;
using Insurance.Poc.Application.Queries.General;
using Insurance.Poc.Application.Responses.General;
using Insurance.Poc.Application.Responses.User;
using Insurance.Poc.Core.Entities;
using Insurance.Poc.Core.Specs;
using Insurance.Poc.Specs;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Insurance.Poc.Api.Controller;

public class UserController(IMediator mediator) : ApiController
{
    private readonly IMediator _mediator = mediator;

    [Authorize(Roles = "ADMIN")]
    [HttpGet]
    [Route("List")]
    [ProducesResponseType(typeof(Pagination<UserResponse>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetAllUsers([FromQuery] GeneralSpecParams criteria)
    {
        var result = await _mediator.Send(new ListQuery<UserResponse>(criteria));

        return Ok(result);
    }

    [Authorize(Roles = "ADMIN")]
    [HttpGet]
    [Route("Get")]
    [ProducesResponseType(typeof(UserResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<UserResponse>> GetUserById(int id)
    {
        var result = await _mediator.Send(new ItemQuery<UserResponse>(id));

        return Ok(result);
    }

    [Authorize(Roles = "ADMIN")]
    [HttpPost]
    [Route("Create")]
    [ProducesResponseType(typeof(CreateCommand<UserEntity, CreateResponse>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> CreateUser([FromBody] UserEntity item)
    {
        var result = await _mediator.Send(new CreateCommand<UserEntity, CreateResponse>(item));

        return Ok(result);
    }

    [Authorize(Roles = "ADMIN")]
    [HttpPut]
    [Route("Update")]
    [ProducesResponseType(typeof(UpdateCommand<UserEntity, UpdateResponse>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> UpdateUser([FromBody] UserEntity item)
    {
        var result = await _mediator.Send(new UpdateCommand<UserEntity, UpdateResponse>(item));

        return Ok(result);
    }

    [Authorize(Roles = "ADMIN")]
    [HttpDelete]
    [Route("Delete")]
    [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> DeleteUser([FromQuery] int id)
    {
        var result = await _mediator.Send(new DeleteCommand<UserEntity, DeleteResponse>(id));

        return Ok(result);
    }
}