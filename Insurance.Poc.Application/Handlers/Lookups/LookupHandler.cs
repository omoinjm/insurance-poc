using Insurance.Poc.Application.Mapper;
using Insurance.Poc.Application.Queries.General;
using Insurance.Poc.Application.Responses.General;
using Insurance.Poc.Core.Repositories;
using Insurance.Poc.Core.Specs;
using MediatR;

namespace Insurance.Poc.Application.Handlers.Lookups;

public class LookupHandler(ILookupRepository lookupRepository) : IRequestHandler<LookupQuery<LookupResponse>, DataList<LookupResponse>>
{
    private readonly ILookupRepository _lookupRepository = lookupRepository;

    public async Task<DataList<LookupResponse>> Handle(LookupQuery<LookupResponse> request, CancellationToken cancellationToken)
    {
        var items = await _lookupRepository.GetLookup(request.LookupParams);

        var response = LazyMapper.Mapper.Map<DataList<LookupResponse>>(items);

        return response;
    }
}