using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using QQKraken.Model;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace QQKraken.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/v1/catalyst-periods")]
    public class CatalystPeriodController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        //TODO: Create a service and inject
        public CatalystPeriodController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IEnumerable<CatalysePeriod> Get()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();
                var result = connection.Query<CatalysePeriod>("App_Sel_ValueNamePairs", new { PairName = "Catalyst_Periods", IntVar1 = 0, StrVar1 = " " }, commandType: CommandType.StoredProcedure);

                return result;
            }


        }
    }
}