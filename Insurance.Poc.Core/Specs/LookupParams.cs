namespace Insurance.Poc.Core.Specs;

public class LookupParams
{
   public string? LookupTableName { get; set; }
   public string? LookupPrimaryKey { get; set; }
   public string? LookupName { get; set; }
   public string? LookupCode { get; set; }
   public string? LookupColour { get; set; }
   public bool UseCustomQuery { get; set; } = false;
   public int? ExcludeId { get; set; }

   public bool IncludeNoneOption { get; set; } = false;

}