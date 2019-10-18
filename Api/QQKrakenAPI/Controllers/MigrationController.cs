using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using qqkraken.model;
using Microsoft.Extensions.Options;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Dapper;
using Microsoft.AspNetCore.Cors;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace QQKrakenAPI.Controllers
{
    [ApiController]
    [Route("api/v1/migrations")]
    public class MigrationController : ControllerBase
    {
        //private readonly ProductsService _productService;
        private readonly IConfiguration _configuration;
        public MigrationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // POST: api/values
        [HttpPost]
        public async Task<IEnumerable<int>> Add(Migration m)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
 

                string sQuery = "INSERT INTO Migrations"
                    + "(MigrationName, MigrationTypeID, SourceHostName, SourceDb, SourceSchema, SourceXmlCount,"
                    + "DestDbHostName, DestDb, DestSchema, DestQqID, IsPhase1, IsPhase2, IsPhase3, IsPhase4, IsPhase5, IsPhase6,"
                    + "AcordAgencyLine1, AcordAgencyLine2, AcordAgencyLine3, AgencyPhoneLine, AgencyFaxLine, AgencyEmailLine,"
                    + " IsPreprocessed, BlankCostValue, CsrNotes,"
                    + " PlannedMigrationDate, EstimatedCleanupDate, MigrationDate, BeginProcesDate, LastProcessDate )"
                    + "OUTPUT Inserted.MigrationId"
                    + " VALUES(@MigrationName, @MigrationTypeID, @SourceHostName, @SourceDb, @SourceSchema, @SourceXmlCount,"
                    + " @DestDbHostName, @DestDb, @DestSchema, @DestQqID, @IsPhase1, @IsPhase2, @IsPhase3, @IsPhase4, @IsPhase5, @IsPhase6, "
                    + " @AcordAgencyLine1, @AcordAgencyLine2, @AcordAgencyLine3, @AgencyPhoneLine, @AgencyFaxLine, @AgencyEmailLine,"
                    + " @IsPreprocessed, @BlankCostValue, @CsrNotes," 
                    + " @PlannedMigrationDate, @EstimatedCleanupDate, @MigrationDate, @BeginProcesDate, @LastProcessDate )";

                await connection.OpenAsync();
                var result = await connection.QueryAsync<int>(sQuery, new
                {
                    MigrationName = m.MigrationName,
                    MigrationTypeID = 1,
                    SourceHostName = m.SourceHostName,
                    SourceDb = m.SourceDb,
                    SourceSchema = m.SourceSchema,
                    SourceXmlCount = m.SourceXmlCount,
                    DestDbHostName = m.DestDbHostName,
                    DestDb = m.DestDb,
                    DestSchema = m.DestSchema,
                    DestQqID = m.DestQqID ?? "QQQTBD",
                    IsPhase1 = m.IsPhase1 ? true : false,
                    IsPhase2 = m.IsPhase2 ? true : false,
                    IsPhase3 = m.IsPhase3 ? true : false,
                    IsPhase4 = m.IsPhase4 ? true : false,
                    IsPhase5 = m.IsPhase5 ? true : false,
                    IsPhase6 = m.IsPhase6 ? true : false,
                    IsPreprocessed = false,
                    CsrNotes = m.CsrNotes ?? "",
                    BlankCostValue = 0.00,
                    AcordAgencyLine1 = m.AcordAgencyLine1 ?? "",
                    AcordAgencyLine2 = m.AcordAgencyLine2 ?? "",
                    AcordAgencyLine3 = m.AcordAgencyLine3 ?? "",
                    AgencyPhoneLine = m.AgencyPhoneLine ?? "",
                    AgencyFaxLine = m.AgencyFaxLine ?? "",
                    AgencyEmailLine = m.AgencyEmailLine ?? "",
                    PlannedMigrationDate = m.TargetDate,
                    EstimatedCleanupDate = "2011-07-01T15:17:33.357",
                    LastProcessDate = "2011-07-01T15:17:33.357",
                    MigrationDate = "2011-07-01T15:17:33.357",
                    BeginProcesDate = "2011-07-01T15:17:33.357"
                });



                return result;
            }


        }

        // GET: api/values
        [HttpGet]
        public async Task<IEnumerable<Migration>> GetAll()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();
                var result = await connection.QueryAsync<Migration>(@"SELECT * FROM Migrations");
                //var result = await connection.QueryAsync<Migration>(@"SELECT * FROM Migrations");



                return result;
            }


        }

        // GET: api/values
        [HttpGet("{id}")]
        public async Task<IEnumerable<Migration>> GetById(int id)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                string sQuery = "SELECT * FROM Migrations"
                               + " WHERE MigrationID = @Id";
                await connection.OpenAsync();
                var result = await connection.QueryAsync<Migration>(sQuery, new { Id = id });
                //var result = await connection.QueryAsync<Migration>(@"SELECT * FROM Migrations");



                return result;
            }


        }
            
        // GET: api/values
        [HttpPut("{id}")]
        public async Task<ActionResult<Migration>> Update([FromBody] Migration m)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                string sQuery = "UPDATE Migrations SET MigrationName = @MigrationName,"
                               + " SourceHostName = @SourceHostName, SourceDb= @SourceDb, "
                               + " SourceSchema = @SourceSchema, SourceXmlCount= @SourceXmlCount, "
                               + " DestDbHostName = @DestDbHostName, DestDb= @DestDb, "
                               + " DestSchema = @DestSchema, DestQqID= @DestQqID, "
                               + " IsPhase1 = @IsPhase1, IsPhase2= @IsPhase2, "
                               + " IsPhase3 = @IsPhase3, IsPhase4 = @IsPhase4 "
                               + " WHERE MigrationId = @MigrationId";

                //string sQuery = " UPDATE Migrations SET MigrationName = 'Del Toro Insu' WHERE MigrationID = 956";

                await connection.OpenAsync();
                var result = await connection.ExecuteAsync(sQuery, new { 
                    Id = m.MigrationId,
                    MigrationId = m.MigrationId,
                    MigrationName = m.MigrationName,
                    SourceHostName = m.SourceHostName,
                    SourceDb = m.SourceDb,
                    SourceSchema = m.SourceSchema,
                    SourceXmlCount = m.SourceXmlCount,
                    DestDbHostName = m.DestDbHostName,
                    DestDb = m.DestDb,
                    DestSchema = m.DestSchema,
                    DestQqID = m.DestQqID,
                    IsPhase1 = m.IsPhase1,
                    IsPhase2 = m.IsPhase2,
                    IsPhase3 = m.IsPhase3,
                    IsPhase4 = m.IsPhase4,
                    TargetDate = m.TargetDate
                });
                //var result = await connection.QueryAsync<Migration>(@"SELECT * FROM Migrations");



                return Ok();
            }


        }

        // GET: api/values
        [HttpGet("{id}/lob-mappings")]
        public async Task<IEnumerable<EvolutionLobCrosswalk>> GetAllLobMappings(int id)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();
                ///var result = await connection.QueryAsync<Migration>(@"SELECT * FROM Evolution_LobCrosswalk");
                //var result = await connection.QueryAsync<Migration>(@"SELECT * FROM Migrations");

                string sQuery = "SELECT * FROM Evolution_LobCrosswalk"
                               + " WHERE MigrationID = @Id";
                //dbConnection.Open();
                return await connection.QueryAsync<EvolutionLobCrosswalk>(sQuery, new { Id = id });
            }


        }

        // GET: api/values
        [HttpGet("{id}/period-mappings")]
        public async Task<IEnumerable<EvolutionPeriodCrosswalk>> GetAllPeriodMappings(int id)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();
                ///var result = await connection.QueryAsync<Migration>(@"SELECT * FROM Evolution_LobCrosswalk");
                //var result = await connection.QueryAsync<Migration>(@"SELECT * FROM Migrations");

                string sQuery = "SELECT * FROM Evolution_PeriodCrosswalk"
                               + " WHERE MigrationID = @Id";
                //dbConnection.Open();
                return await connection.QueryAsync<EvolutionPeriodCrosswalk>(sQuery, new { Id = id });
            }


        }
    }
}