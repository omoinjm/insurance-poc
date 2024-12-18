using Insurance.Poc.Core.Specs;
using MediatR;

namespace Insurance.Poc.Application.Queries.General;

public class LookupQuery<T>(LookupParams p) : IRequest<DataList<T>> where T : class
{
    public LookupParams LookupParams { get; set; } = p;
}