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
    [Route("api/v1/period-mappings")]
    public class PeriodMappingController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public PeriodMappingController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IEnumerable<Period>> Get()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();
                var result = await connection.QueryAsync<Period>(@"
                    SELECT
                        MigrationId,
                        EvolutionPeriod AS SourcePeriod,
                        CatalystPeriod AS TargetPeriod
                      FROM
                        Evolution_PeriodCrosswalk");

                return result;
            }
        }

        [HttpPut]
        public async Task<ActionResult<Period>> Update([FromBody] Period l)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                string sQuery = "UPDATE Evolution_PeriodCrosswalk SET MigrationId = @MigrationId,"
                               + " EvolutionPeriod = @EvolutionPeriod, CatalystPeriod= @CatalystPeriod "
                               + " WHERE MigrationId = @MigrationId AND EvolutionPeriod = @EvolutionPeriod";


                await connection.OpenAsync();
                var result = await connection.ExecuteAsync(sQuery, new
                {
                    Id = l.MigrationId,
                    MigrationId = l.MigrationId,
                    EvolutionPeriod = l.SourcePeriod,
                    CatalystPeriod = l.TargetPeriod
                });

                return Ok();
            }
        }
    }
}