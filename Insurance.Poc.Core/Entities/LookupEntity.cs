namespace Insurance.Poc.Core.Entities;

public class LookupEntity
{
   public int? Id { get; set; }
   public required string Name { get; set; }
   public string? IdList { get; set; }
   public int[]? IdArr { get; set; }
   public string? Code { get; set; }
   public string? Colour { get; set; }
}
