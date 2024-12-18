using MediatR;

namespace Insurance.Poc.Application.Queries.General;

public class ItemQuery<T>(int id) : IRequest<T> where T : class
{
    public int? Id { get; set; } = id;
}