using Insurance.Poc.Core.Repositories;
using Insurance.Poc.Application.Commands.General;
using Insurance.Poc.Application.Mapper;
using Insurance.Poc.Application.Responses.General;
using Insurance.Poc.Core.Entities;
using Insurance.Poc.Core.Results;
using MediatR;

namespace Insurance.Poc.Application.Handlers.Users;


public class UpdateUserHandler(IUserRepository repository) : IRequestHandler<UpdateCommand<UserEntity, UpdateResponse>, UpdateResponse>
{
    private readonly IUserRepository _repository = repository;

    public async Task<UpdateResponse> Handle(UpdateCommand<UserEntity, UpdateResponse> request, CancellationToken cancellationToken)
    {

        var result = (request.Item != null) ? await _repository.UpdateUser(request.Item) : new UpdateRecordResult() { };

        return LazyMapper.Mapper.Map<UpdateResponse>(result);
    }
}