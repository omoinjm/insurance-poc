using Insurance.Poc.Core.Repositories;
using Insurance.Poc.Application.Commands.General;
using Insurance.Poc.Application.Mapper;
using Insurance.Poc.Application.Responses.General;
using Insurance.Poc.Core.Entities;
using Insurance.Poc.Core.Results;
using MediatR;

namespace Insurance.Poc.Application.Handlers.Users;

public class CreateUserHandler(IUserRepository repository) : IRequestHandler<CreateCommand<UserEntity, CreateResponse>, CreateResponse>
{
    private readonly IUserRepository _repository = repository;

    public async Task<CreateResponse> Handle(CreateCommand<UserEntity, CreateResponse> request, CancellationToken cancellationToken)
    {
        request.Item.Salt = request.Item.Salt;

        var result = (request.Item != null) ? await _repository.CreateUser(request.Item) : new CreateRecordResult();

        return LazyMapper.Mapper.Map<CreateResponse>(result);
    }
}
