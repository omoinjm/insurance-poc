using Insurance.Poc.Core.Repositories;
using Insurance.Poc.Application.Mapper;
using Insurance.Poc.Application.Queries.Menu;
using Insurance.Poc.Application.Responses.Application.Menu;
using MediatR;

namespace Insurance.Poc.Application.Handlers.Application.Menu;

public class GetAllMenusHandler(IMenuRepository menuRepository) : IRequestHandler<GetAllMenusQuery, IList<MenuModuleResponse>>
{
    private readonly IMenuRepository _menuRepository = menuRepository;

    public async Task<IList<MenuModuleResponse>> Handle(GetAllMenusQuery request, CancellationToken cancellationToken)
    {
        var menuList = await _menuRepository.GetMenus();

        var menuResponseList = LazyMapper.Mapper.Map<List<MenuResponse>>(menuList);

        var groupedMenus = menuResponseList
            .GroupBy(menu => new { menu.ModuleId, menu.ModuleDisplayText, menu.ModuleIcon, menu.ModuleSortOrder, menu.ModuleRouterLink })
            .Select(group => new MenuModuleResponse
            {
                ModuleId = group.Key.ModuleId,
                ModuleIcon = group.Key.ModuleIcon,
                ModuleName = group.Key.ModuleDisplayText,
                ModuleSortOrder = group.Key.ModuleSortOrder,
                ModuleRouterLink = group.Key.ModuleRouterLink,

                MenuList = group.ToList()
            })
            .ToList();

        return groupedMenus;
    }
}
