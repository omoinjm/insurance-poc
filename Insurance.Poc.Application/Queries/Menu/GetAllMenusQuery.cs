using MediatR;
using Insurance.Poc.Application.Responses.Application.Menu;

namespace Insurance.Poc.Application.Queries.Menu;

public class GetAllMenusQuery : IRequest<IList<MenuModuleResponse>>
{
}