using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using QQKraken.Model;
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
        public async Task<IEnumerable<EvolutionPeriodCrosswalk>> Get()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();
                var result = await connection.QueryAsync<EvolutionPeriodCrosswalk>(@"SELECT * FROM Evolution_PeriodCrosswalk");

                return result;
            }
        }

        [HttpPut]
        public async Task<ActionResult<EvolutionPeriodCrosswalk>> Update([FromBody] EvolutionPeriodCrosswalk l)
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
                    EvolutionPeriod = l.EvolutionPeriod,
                    CatalystPeriod = l.CatalystPeriod
                });

                return Ok();
            }
        }
    }
}