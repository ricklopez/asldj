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
    [Route("api/v1/lob-mappings")]
    public class LobMappingController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        //TODO: Create a service and inject
        public LobMappingController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IEnumerable<EvolutionLobCrosswalk>> Get()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();
                var result = await connection.QueryAsync<EvolutionLobCrosswalk>(@"SELECT * FROM Evolution_LobCrosswalk");

                return result;
            }


        }

        // GET: api/values
        [HttpPut]
        public async Task<ActionResult<EvolutionLobCrosswalk>> Update([FromBody] EvolutionLobCrosswalk l)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                string sQuery = "UPDATE Evolution_LobCrosswalk SET MigrationId = @MigrationId,"
                               + " EvolutionLOB = @EvolutionLOB, EvolutionCoverage= @EvolutionCoverage, "
                               + " CatalystLOB = @CatalystLOB, DisplayName= @DisplayName, "
                               + " CountOfEvolutionRows = @CountOfEvolutionRows "
                               + " WHERE MigrationId = @MigrationId AND EvolutionLOB = @EvolutionLOB AND EvolutionCoverage = @EvolutionCoverage;";

                //string sQuery = " UPDATE Migrations SET MigrationName = 'Del Toro Insu' WHERE MigrationID = 956";

                await connection.OpenAsync();
                var result = await connection.ExecuteAsync(sQuery, new
                {
                    Id = l.MigrationId,
                    MigrationId = l.MigrationId,
                    EvolutionLOB = l.EvolutionLOB,
                    EvolutionCoverage = l.EvolutionCoverage,
                    CatalystLOB = l.CatalystLOB,
                    DisplayName = l.DisplayName,
                    CountOfEvolutionRows = l.CountOfEvolutionRows
                });
                //var result = await connection.QueryAsync<Migration>(@"SELECT * FROM Migrations");



                return Ok();
            }


        }
    }
}