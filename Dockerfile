#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

EXPOSE 5242
EXPOSE 5000

# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ["./Insurance.Poc.Api/Insurance.Poc.Api.csproj", "./"]
COPY ["./Insurance.Poc.Application/Insurance.Poc.Application.csproj", "./"]
COPY ["./Insurance.Poc.Core/Insurance.Poc.Core.csproj", "./"]
COPY ["./Insurance.Poc.Infrastructure/Insurance.Poc.Infrastructure.csproj", "./"]

RUN dotnet restore "./Insurance.Poc.Api.csproj"
COPY . .
WORKDIR /src
RUN dotnet build "./Insurance.Poc.Api/Insurance.Poc.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Insurance.Poc.Api/Insurance.Poc.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Serve Stage
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "Insurance.Poc.Api.dll"]