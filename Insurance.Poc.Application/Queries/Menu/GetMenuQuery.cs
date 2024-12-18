using Insurance.Poc.Application.Responses.Application.Menu;
using MediatR;

namespace Insurance.Poc.Application.Queries.Menu;

public class GetMenuQuery(int id) : IRequest<MenuResponse>
{
    public int Id { get; set; } = id;
}
