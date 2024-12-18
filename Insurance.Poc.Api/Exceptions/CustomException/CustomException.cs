using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Insurance.Poc.Api.Exceptions.CustomException;

public class CustomException : Exception
{
    public string? AdditionalInfo { get; set; }
    public string? Type { get; set; }
    public string? Detail { get; set; }
    public string? Title { get; set; }
    public string? Instance { get; set; }
}