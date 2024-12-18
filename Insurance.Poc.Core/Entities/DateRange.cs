namespace Insurance.Poc.Core.Entities;

public class DateRange
{
    public string name { get; set; }
    public DateTime? startDate { get; set; }
    public DateTime? endDate { get; set; }
    public bool isOnClear { get; set; }
    public bool isOnChange { get; set; }
    public bool isRange { get; set; }
}
