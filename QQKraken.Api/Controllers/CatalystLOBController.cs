using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using QQKraken.Api.Models;
using System.Collections.Generic;
using System.Data.SqlClient;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace QQKraken.Api.Controllers
{
    [ApiController]
    [Route("api/v1/catalyst-lobs")]
    public class CatalystLOBController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        //TODO: Create a service and inject
        public CatalystLOBController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IEnumerable<CatalystLOB> Get()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();
                var result = connection.Query<CatalystLOB>(@"SELECT * FROM Catalyst_LOBs");

                return result;
            }


        }
    }
}