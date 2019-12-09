using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using QQKraken.Api.Models.Mappings;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace QQKraken.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/v1/office-mappings")]
    public class OfficeMappingController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public OfficeMappingController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IEnumerable<Office>> Get()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {

                var q = @"
                    SELECT
                        MigrationID,
                        Evolution_OfficeName AS OfficeName,
                        Evolution_OfficeId AS OfficeSourceId,
                        Catalyst_OfficeId AS OfficeId
                    FROM Evolution_OfficeCrosswalk
                ";
                await connection.OpenAsync();
                var result = await connection.QueryAsync<Office>(q);

                return result;
            }
        }

        [HttpPut]
        public async Task<ActionResult<Office>> Update([FromBody] Office l)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                string sQuery = "UPDATE Evolution_OfficeCrosswalk SET MigrationId = @MigrationId," 
                    + " Evolution_OfficeName = @OfficeName, Evolution_OfficeId = @OfficeId,"
                    + " Catalyst_OfficeId = @Id "
                    + " WHERE MigrationId = @MigrationId AND Evolution_OfficeId = @OfficeId; ";


                await connection.OpenAsync();
                var result = await connection.ExecuteAsync(sQuery, new
                {
                    l.MigrationId,
                    l.Id,
                    l.OfficeId,
                    l.OfficeName
                });

                return Ok();
            }
        }
    }
}