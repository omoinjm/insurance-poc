using Insurance.Poc.Core.Specs;
using Insurance.Poc.Specs;
using MediatR;

namespace Insurance.Poc.Application.Queries.General;

public class ListQuery<T>(GeneralSpecParams generalSpecParams) : IRequest<Pagination<T>> where T : class
{
    public GeneralSpecParams GeneralSpecParams { get; set; } = generalSpecParams;
}
