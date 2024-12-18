using Insurance.Poc.Core.Entities;
using Insurance.Poc.Core.Results;
using Insurance.Poc.Core.Specs;
using Insurance.Poc.Specs;

namespace Insurance.Poc.Core.Repositories;

public interface IUserRepository
{
    Task<Pagination<UserEntity>> GetAllUsers(GeneralSpecParams generalSpecParams);
    Task<UserEntity> GetUser(int Id);
    Task<UserEntity?> GetUserByEmail(string email);
    Task<CreateRecordResult> CreateUser(UserEntity user);
    Task<UpdateRecordResult> UpdateUser(UserEntity user);
    Task<DeleteRecordResult> DeleteUser(int id);
}
