using Insurance.Poc.Core.Repositories;
using Insurance.Poc.Application.Mapper;
using Insurance.Poc.Application.Queries.General;
using Insurance.Poc.Application.Responses.Auth;
using MediatR;
using Insurance.Poc.Application.Responses.User;

namespace Insurance.Poc.Application.Handlers.Users;

public class GetUserQueryHandler(IUserRepository userRepository) : IRequestHandler<ItemQuery<UserResponse>, UserResponse>
{
    private readonly IUserRepository _userRepository = userRepository;

    public async Task<UserResponse> Handle(ItemQuery<UserResponse> request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUser(request.Id!.Value);

        var userResponse = LazyMapper.Mapper.Map<UserResponse>(user);

        return userResponse;
    }
}