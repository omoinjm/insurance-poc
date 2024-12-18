using System.Web;
using Insurance.Poc.Core.Repositories;
using Dapper;
using Insurance.Poc.Core.Auth;
using Insurance.Poc.Core.Entities;
using Insurance.Poc.Core.Repositories;
using Insurance.Poc.Core.Results;
using Insurance.Poc.Core.Services;
using Insurance.Poc.Core.Specs;
using Insurance.Poc.Specs;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Npgsql;

namespace Insurance.Poc.Infrastructure.Repositories;

public class DBRepository(
    IConfiguration configuration,
    IConfigurationService configService,
    ICachingInMemoryService cachingInMemoryService
) : //Application
    IMenuRepository,
    ILookupRepository,

    //Business
    IUserRepository
{
    private readonly IConfiguration _configuration = configuration;
    private readonly IConfigurationService _configurationService = configService;
    private readonly ICachingInMemoryService _cachingInMemoryService = cachingInMemoryService;

    #region Helper Methods

    /// <summary>
    /// Gets common connection string
    /// </summary>
    /// <returns></returns>
    public string GetConnectionString()
    {
        //string connectionString = _configuration.GetValue<string>("ConnectionString:ConnectionString");
        //return connectionString;
        return _configurationService.ConnectionString();
    }

    /// <summary>
    /// Gets the auth token in the relevant database for the user
    /// </summary>
    /// <returns></returns>
    /// <exception cref="ApplicationException"></exception>
    public string GetAuthToken()
    {
        string authToken = _cachingInMemoryService.Get<string>("AuthToken");
        var user = GetUserInfo();

        if (authToken == null)
        {
            using (var scon = new NpgsqlConnection(GetConnectionString()))
            {
                authToken = scon.QuerySingleOrDefault<string>("SELECT LoginToken FROM au_user WHERE email = @EmailAddress", new { EmailAddress = user.Email });

                if (authToken == null)
                {
                    throw new ApplicationException("Cannot get authToken from UserAccount table, need to login again");
                }

                _cachingInMemoryService.Set<string>("AuthToken", authToken);
            }
        }

        return authToken;
    }

    /// <summary>
    /// Gets the cached user info from the caching service
    /// </summary>
    /// <returns></returns>
    /// <exception cref="ApplicationException"></exception>
    public IUserInfo GetUserInfo()
    {
        var token = _cachingInMemoryService.Get<string>("AuthToken");

        if (token == null)
        {
            throw new ApplicationException("Cannot get token from Caching In Memory Service, need to login again");
        }
        return _cachingInMemoryService.Get<IUserInfo>(token);
    }

    #endregion

    #region Menu

    public async Task<List<MenuEntity>> GetMenus()
    {
        await using var connection = new NpgsqlConnection(GetConnectionString());

        var query = @$"
                
                SELECT

                    a.id as ModuleItemId,
                    a.module_id as ModuleId,

                    m.sidebar_class AS ModuleSidebarClass,
                    a.sort_order as SortOrder,
                    m.sort_order AS ModuleSortOrder,
                    a.icon as Icon,
                    m.icon AS ModuleIcon,
                    a.display_text as DisplayText,
                    m.display_text AS ModuleDisplayText,
                    a.router_link as RouterLink,
                    m.router_link AS ModuleRouterLink

                FROM ui_sys_module_item a

                LEFT JOIN ui_sys_module m ON m.id = a.module_id

                WHERE COALESCE(a.require_admin, false) <> true AND a.is_enabled = true

                ORDER BY COALESCE(m.sort_order, 999) ASC, COALESCE(a.sort_order, 999) ASC;
            ";

        var result = await connection.QueryAsync<MenuEntity>(query);

        return result.ToList();
    }

    #endregion

    #region User

    private int LoggedInUserId { get => _cachingInMemoryService.Get<int>("loggedInUserId"); }

    public async Task<Pagination<UserEntity>> GetAllUsers(GeneralSpecParams generalSpecParams)
    {
        await using var connection = new NpgsqlConnection(GetConnectionString());

        string _whereClause = string.Empty;

        string _sortClause = SortClause(generalSpecParams.Sort, generalSpecParams.SortAscending);

        var lookups = new List<LookupEntity>();

        if (!string.IsNullOrEmpty(generalSpecParams.Lookups))
        {
            lookups = JsonConvert
                .DeserializeObject<List<LookupEntity>>(HttpUtility.UrlDecode(generalSpecParams.Lookups))
                .Where(x => x.Id != null).ToList();
        }

        foreach (var lookup in lookups)
        {
            _whereClause += $" and ({lookup.Name} = {lookup.Id})";
        }

        var ranges = new List<DateRange>();

        if (!string.IsNullOrEmpty(generalSpecParams.Ranges))
        {
            ranges = JsonConvert
                .DeserializeObject<List<DateRange>>(HttpUtility.UrlDecode(generalSpecParams.Ranges))
                .Where(x => x.isOnChange == true).ToList();
        }

        foreach (var range in ranges)
        {
            //MP: if the date range
            if (range.isOnChange == true)
            {

                if (range.isRange == true && (range.startDate != null && range.endDate != null) && (range.startDate != range.endDate))
                {
                    _whereClause +=
                        $" and ({range.name} >= '{range.startDate?.ToString("yyyy-MM-dd HH:mm:ss")}' and {range.name} <= '{range.endDate?.ToString("yyyy-MM-dd HH:mm:ss")}')";
                }
                else if (range.isRange == false && (range.startDate != null))
                {
                    _whereClause +=
                        $" and ({range.name} >= '{range.startDate?.AddDays(1).ToString("yyyy-MM-dd 00:00:00")}'  and {range.name} < '{range.startDate?.AddDays(2).ToString("yyyy-MM-dd 00:00:00")}')";
                }

            }

        }

        if (!String.IsNullOrEmpty(generalSpecParams.Search))
        {
            _whereClause += @$"
                AND (email LIKE '%{generalSpecParams.Search}%'
                OR name LIKE '%{generalSpecParams.Search}%'
                OR surname LIKE '%{generalSpecParams.Search}%'
                OR (name || ' ' || surname) LIKE '%{generalSpecParams.Search}%')
            ";
        }

        var query = @$"

            
            SELECT

                u.id AS Id,
                u.name AS Name,
                u.surname AS Surname,
                u.email AS Email,
                u.password AS Password,
                u.salt AS Salt,
                u.change_password AS ChangePassword,
                u.created_by AS CreatedBy,
                u.updated_by AS UpdatedBy,
                u.deleted_by AS DeletedBy,
                u.synced_at AS SyncedAt,
                u.created_at AS CreatedAt,
                u.updated_at AS UpdatedAt,
                u.deleted_at AS DeletedAt,
                u.phone_number AS PhoneNumber,
                u.role AS Role,

                u.is_active AS IsActive,
                u.login_date AS LoginDate,
               
                u.status_id AS UserStatusId,
                us.status AS UserStatusName,
                us.symbol AS UserStatusSymbol,
                us.color AS UserStatusColor
            
            FROM au_users u
            LEFT JOIN ui_user_status us ON us.id = u.status_id

            WHERE 1=1 {_whereClause}

            ORDER BY u.name
            
            LIMIT {generalSpecParams.PageSize} OFFSET {(generalSpecParams.PageIndex - 1) * generalSpecParams.PageSize}

        ";

        var users = await connection.QueryAsync<UserEntity>(query);

        return new Pagination<UserEntity>
        {
            PageIndex = generalSpecParams.PageIndex,
            PageSize = generalSpecParams.PageSize,
            Data = users.ToList(),
            Count = users.ToList().Count
        };
    }

    private async Task<List<UserEntity>> GetUsers()
    {
        await using var connection = new NpgsqlConnection(GetConnectionString());

        var query = @"
            
            SELECT

                u.id AS Id,
                u.name AS Name,
                u.surname AS Surname,
                u.email AS Email,
                u.password AS Password,
                u.salt AS Salt,
                u.change_password AS ChangePassword,
                u.created_by AS CreatedBy,
                u.updated_by AS UpdatedBy,
                u.deleted_by AS DeletedBy,
                u.synced_at AS SyncedAt,
                u.created_at AS CreatedAt,
                u.updated_at AS UpdatedAt,
                u.deleted_at AS DeletedAt,
                u.phone_number AS PhoneNumber,
                u.role AS Role,

                u.is_active AS IsActive,
                u.login_date AS LoginDate,
               
                u.status_id AS UserStatusId,
                us.status AS UserStatusName,
                us.symbol AS UserStatusSymbol,
                us.color AS UserStatusColor
            
            
            FROM au_users u
            LEFT JOIN ui_user_status us ON us.id = u.status_id
        ";

        var users = await connection.QueryAsync<UserEntity>(query);

        return users.ToList();
    }

    public async Task<UserEntity> GetUser(int id)
    {
        await using var connection = new NpgsqlConnection(GetConnectionString());

        var result = await GetUsers();

        var user = result.Where(x => x.Id == id).SingleOrDefault();

        return user ?? new UserEntity();
    }

    public async Task<UserEntity?> GetUserByEmail(string email)
    {
        await using var connection = new NpgsqlConnection(GetConnectionString());

        var result = await GetUsers();

        var user = result.Where(x => x.Email == email).SingleOrDefault();

        return user;
    }

    public async Task<CreateRecordResult> CreateUser(UserEntity user)
    {
        await using var connection = new NpgsqlConnection(GetConnectionString());

        var id = await connection.ExecuteScalarAsync<int>
        (@"
            INSERT INTO au_users
            (
                name, 
                surname, 
                email,
                salt, 
                password, 
                role,
                phone_number,
                created_at,
                created_by,
                deleted, 
                status_id,
                is_active
            )
            VALUES 
            (
                @name,
                @surname, 
                @email,
                @salt, 
                @password, 
                @role, 
                @phoneNumber,
                NOW(), 
                @createdBy, 
                false,
                @statusId,
                true
            );
        
            SELECT LASTVAL();
            ",
        new
        {
            name = user.Name,
            surname = user.Surname,
            email = user.Email,
            salt = user.Salt,
            password = user.Password,
            role = user.Role,
            phoneNumber = user.PhoneNumber,
            createdBy = user.CreatedBy,
            statusId = user.UserStatusId
        });

        return new CreateRecordResult() { IsSuccess = true, ReturnRecordId = id };
    }

    public async Task<UpdateRecordResult> UpdateUser(UserEntity user)
    {
        await using var connection = new NpgsqlConnection(GetConnectionString());

        var affected = await connection.ExecuteAsync
        (@"
            UPDATE au_users SET

                name = @name,
                role = @role,
                updated_at = NOW(),
                surname = @surname,
                status_id = @statusId,
                id_number = @idNumber,
                is_active = @isActive,
                updated_by = @updatedBy,
                login_date = @loginDate,
                phone_number = @phoneNumber
    
            WHERE id = @id",
        new
        {
            id = user.Id,
            name = user.Name,
            role = user.Role,
            surname = user.Surname,
            statusId = user.UserStatusId,
            idNumber = user.IdNumber,
            isActive = user.IsActive,
            updatedBy = user.UpdatedBy,
            LoginDate = user.LoginTimeStamp,
            phoneNumber = user.PhoneNumber
        });

        return new UpdateRecordResult() { IsSuccess = affected != 0 };
    }

    public async Task<DeleteRecordResult> DeleteUser(int id)
    {
        await using var connection = new NpgsqlConnection(GetConnectionString());

        var affected = await connection.ExecuteAsync("UPDATE au_users SET deleted = true WHERE id = @id", new { id });

        return new DeleteRecordResult() { IsSuccess = true };
    }

    #endregion

    #region Lookups

    public async Task<DataList<LookupEntity>> GetLookup(LookupParams lookupParams)
    {
        await using var connection = new NpgsqlConnection(GetConnectionString());

        var items = new List<LookupEntity>();

        switch (lookupParams.LookupTableName)
        {
            case "AU_UserCompany":
                var userCompanyQuery = @$"
                              SELECT 
                                CompanyId as Id,
                                Name
                              FROM MA_Company
                            WHERE CompanyId NOT IN (SELECT CompanyId from AU_UserCompany WHERE UserId = @userId)";
                items = (List<LookupEntity>)await connection.QueryAsync<LookupEntity>(userCompanyQuery,
                        new { userId = lookupParams.ExcludeId });
                break;
            case "AU_BillingUser":
                var billingUserQuery = @$"
                             SELECT
                               UserId as Id,
                               CONCAT(FirstName,' ',Surname) as Name,
                               Substring(FirstName,1,1) +  Substring(Surname,1,1) as Code,
                               'Blue' as Colour
                             FROM AU_User a
                            WHERE (a.BillingCompanyId IS NULL OR a.BillingCompanyId <> @companyId)";
                items = (List<LookupEntity>)await connection.QueryAsync<LookupEntity>(billingUserQuery,
                        new { companyId = lookupParams.ExcludeId });
                break;
            case "MA_CompanyPackage":
                var companyPackageQuery = @$"
                             SELECT
                               a.PackageId as Id,
                               a.Name
                             FROM MA_Package a
                             INNER JOIN MA_CompanyPackage b ON a.PackageId = b.PackageId AND b.CompanyId = @companyId
                             WHERE a.IsActive = 1";
                items = (List<LookupEntity>)await connection.QueryAsync<LookupEntity>(companyPackageQuery,
                        new { companyId = lookupParams.ExcludeId });
                break;
            default:
                var defaultQuery = @$"

                      select
                          {lookupParams.LookupPrimaryKey} as Id,
                          {lookupParams.LookupName} as Name,
                          {lookupParams.LookupCode ?? "''"} as Code,
                          {lookupParams.LookupColour ?? "''"} as Colour
                    
                      from {lookupParams.LookupTableName} a
                      ";

                items = (List<LookupEntity>)await connection.QueryAsync<LookupEntity>(defaultQuery);
                break;
        }


        if (lookupParams.IncludeNoneOption == true)
        {
            items = items.Prepend(new LookupEntity() { Id = null, Name = "None" }).ToList();
        }

        return new DataList<LookupEntity>
        {
            Data = items.ToList(),
            Count = items.ToList().Count
        };
    }

    private string SortClause(string sortField = "1", bool sortAscending = true)
    {

        if (sortAscending == true)
        {
            return sortField + " ASC";
        }
        else
        {
            return sortField + " DESC";
        }
    }

    #endregion

}
