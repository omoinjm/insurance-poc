using Microsoft.AspNetCore.Mvc;

namespace Insurance.Poc.Api.Controller;

[ApiVersion("1")]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiController]
public class ApiController : ControllerBase { }