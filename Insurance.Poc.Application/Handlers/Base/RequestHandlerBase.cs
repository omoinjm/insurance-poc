using MediatR;

namespace Insurance.Poc.Application.Handlers.Base;

public abstract class RequestHandlerBase<TRequest, TResponse> : IRequestHandler<TRequest, TResponse> where TRequest : IRequest<TResponse>
{
    public RequestHandlerBase() { }

    public abstract Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken);
}