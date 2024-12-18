using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Insurance.Poc.Application.Queries.Menu;
using Insurance.Poc.Application.Responses.Application.Menu;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Insurance.Poc.Api.Controller;

public class MenuController(IMediator mediator) : ApiController
{
    private readonly IMediator _mediator = mediator;

    [HttpGet]
    [Route("List")]
    [ProducesResponseType(typeof(IList<MenuResponse>), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<IList<MenuResponse>>> GetAllMenus()
    {
        var query = new GetAllMenusQuery();
        var result = await _mediator.Send(query);
        return Ok(result);
    }

    // [HttpGet]
    // [Route("[action]/{id}", Name = "GetMenuById")]
    // [ProducesResponseType(typeof(MenuResponse), (int)HttpStatusCode.OK)]
    // public async Task<ActionResult<MenuResponse>> GetMenuById(int id)
    // {
    //     var query = new GetMenuQuery(id);
    //     var result = await _mediator.Send(query);
    //     return Ok(result);
    // }

}