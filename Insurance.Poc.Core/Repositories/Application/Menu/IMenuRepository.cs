using Insurance.Poc.Core.Entities;

namespace Insurance.Poc.Core.Repositories;

public interface IMenuRepository
{
   Task<List<MenuEntity>> GetMenus();
}
