using MediatR;

namespace Insurance.Poc.Application.Commands.General;

public class CreateCommand<T, R>(T item) : IRequest<R> where R : class
{
    public T Item { get; set; } = item;
}
