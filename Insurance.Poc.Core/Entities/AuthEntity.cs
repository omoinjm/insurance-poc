
using System.Text.Json.Serialization;

namespace Insurance.Poc.Core.Entities;

/// <summary>
/// Represents an entity that requires authorization
/// </summary>
public abstract class AuthEntity
{
   [JsonIgnore]
   public string? AuthToken { get; set; }
}

