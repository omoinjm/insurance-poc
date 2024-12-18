using Insurance.Poc.Core.Entities;
using Insurance.Poc.Core.Specs;
using Insurance.Poc.Specs;

namespace Insurance.Poc.Core.Repositories;

public interface ILookupRepository
{
   Task<DataList<LookupEntity>> GetLookup(LookupParams lookupParams);

   // Task<Pagination<UserEntity>> GetUsers(GeneralSpecParams generalSpecParams);

}
