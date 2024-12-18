using AutoMapper;
using Insurance.Poc.Application.Responses.Application.Menu;
using Insurance.Poc.Application.Responses.General;
using Insurance.Poc.Application.Responses.User;
using Insurance.Poc.Core.Entities;
using Insurance.Poc.Core.Results;
using Insurance.Poc.Core.Specs;
using Insurance.Poc.Specs;

namespace Insurance.Poc.Application.Mapper;

public class ConfigureMappingProfile : Profile
{
    public ConfigureMappingProfile()
    {
        CreateMap<UpdateResponse, UpdateRecordResult>().ReverseMap();
        CreateMap<CreateResponse, CreateRecordResult>().ReverseMap();
        CreateMap<DeleteResponse, DeleteRecordResult>().ReverseMap();

        //Lookups
        CreateMap<LookupEntity, LookupResponse>().ReverseMap();
        CreateMap<DataList<LookupEntity>, DataList<LookupResponse>>().ReverseMap();

        CreateMap<GeneralSpecParams, LookupParams>().ReverseMap();

        // Users
        CreateMap<UserEntity, UserResponse>().ReverseMap();
        CreateMap<Pagination<UserEntity>, Pagination<UserResponse>>().ReverseMap();

        CreateMap<GeneralSpecParams, LookupParams>().ReverseMap();

        CreateMap<UserEntity, UserResponse>().ReverseMap();
        CreateMap<Pagination<UserEntity>, Pagination<UserResponse>>().ReverseMap();

        // Menu
        CreateMap<MenuEntity, MenuResponse>().ReverseMap();
    }
}
