using Insurance.Poc.Core.Repositories;
using Insurance.Poc.Application.Mapper;
using Insurance.Poc.Application.Queries.General;
using Insurance.Poc.Application.Responses.User;
using Insurance.Poc.Core.Specs;
using MediatR;

namespace Insurance.Poc.Application.Handlers.Users;

public class GetUsersHandler(IUserRepository userRepository) : IRequestHandler<ListQuery<UserResponse>, Pagination<UserResponse>>
{
    private readonly IUserRepository _userRepository = userRepository;

    public async Task<Pagination<UserResponse>> Handle(ListQuery<UserResponse> request, CancellationToken cancellationToken)
    {
        var items = await _userRepository.GetAllUsers(request.GeneralSpecParams);

        var response = LazyMapper.Mapper.Map<Pagination<UserResponse>>(items);

        return response;
    }
}