using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Insurance.Poc.Application.Queries.General;
using Insurance.Poc.Application.Responses.General;
using Insurance.Poc.Core.Specs;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Insurance.Poc.Api.Controller;

public class LookupController(IMediator mediator) : ApiController
{
    private readonly IMediator _mediator = mediator;

    [Authorize(Roles = "USER,ADMIN")]
    [HttpGet]
    [Route("List")]
    [ProducesResponseType(typeof(DataList<LookupResponse>), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<DataList<LookupResponse>>> GetLookupList([FromQuery] LookupParams lookupSpecParams)
    {
        var query = new LookupQuery<LookupResponse>(lookupSpecParams);

        var result = await _mediator.Send(query);

        return Ok(result);
    }
}
