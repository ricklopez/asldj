using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using QQKraken.Api.Models;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace QQKraken.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/v1/migration-action-item")]
    public class MigrationActionItemController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        //TODO: Create a service and inject
        public MigrationActionItemController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{id}")]
        public async Task<MigrationActionItem> Get(int id)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                var query = @"
                    SELECT
	                    ActionItemID AS Id,
	                    MigrationId,
	                    ErrorNumber,
	                    ParentTable,
	                    ProblemCategory AS [Category],
	                    ProblemDesc AS [Description],
	                    RecordsAffected,
	                    DefaultAction,
	                    ActionValue
                      FROM
	                    [dbo].[MigrationsActionItems]
                      WHERE
	                    ActionItemID = @Id";

                return await connection.QueryFirstOrDefaultAsync<MigrationActionItem>(query, new { Id = id });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<MigrationActionItem>> Put(int id, [FromBody] MigrationActionItem record)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                var query = @"
                    UPDATE
	                    [dbo].[MigrationsActionItems]
                      SET
	                    ActionValue = @ActionValue
                      WHERE
	                    ActionItemID = @Id";

                await connection.ExecuteAsync(query, new { Id = id, ActionValue = record.ActionValue });

                return Ok();
            }
        }
    }
}