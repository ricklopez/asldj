using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;
using Dapper;
using QQKraken.Model;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace QQKrakenAPI.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/v1/period-mappings")]
    public class PeriodMappingController : ControllerBase
    {
        //private readonly ProductsService _productService;
        private readonly IConfiguration _configuration;

        public PeriodMappingController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        // GET: api/values
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

        // GET: api/values
        [HttpPut]
        public async Task<ActionResult<EvolutionPeriodCrosswalk>> Update([FromBody] EvolutionPeriodCrosswalk l)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                string sQuery = "UPDATE Evolution_PeriodCrosswalk SET MigrationId = @MigrationId,"
                               + " EvolutionPeriod = @EvolutionPeriod, CatalystPeriod= @CatalystPeriod "
                               + " WHERE MigrationId = @MigrationId AND EvolutionPeriod = @EvolutionPeriod";

                //string sQuery = " UPDATE Migrations SET MigrationName = 'Del Toro Insu' WHERE MigrationID = 956";

                await connection.OpenAsync();
                var result = await connection.ExecuteAsync(sQuery, new
                {
                    Id = l.MigrationId,
                    MigrationId = l.MigrationId,
                    EvolutionPeriod = l.EvolutionPeriod,
                    CatalystPeriod = l.CatalystPeriod
                });
                //var result = await connection.QueryAsync<Migration>(@"SELECT * FROM Migrations");



                return Ok();
            }


        }
    }
}