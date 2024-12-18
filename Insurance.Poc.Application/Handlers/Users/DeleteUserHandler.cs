using Insurance.Poc.Core.Repositories;
using Insurance.Poc.Application.Commands.General;
using Insurance.Poc.Application.Mapper;
using Insurance.Poc.Application.Responses.General;
using Insurance.Poc.Core.Entities;
using Insurance.Poc.Core.Results;
using MediatR;

namespace Insurance.Poc.Application.Handlers.Users;

public class DeleteUserHandler(IUserRepository repository) : IRequestHandler<DeleteCommand<UserEntity, DeleteResponse>, DeleteResponse>
{
    private readonly IUserRepository _repository = repository;

    public async Task<DeleteResponse> Handle(DeleteCommand<UserEntity, DeleteResponse> request, CancellationToken cancellationToken)
    {
        var result = (request.Id != null && request.Id != 0) ? await _repository.DeleteUser((int)request.Id) : new DeleteRecordResult();

        return LazyMapper.Mapper.Map<DeleteResponse>(result);
    }
}
