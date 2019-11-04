using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using QQKraken.Model;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace QQKrakenAPI.Controllers
{
    [Route("api/v1/catalyst-periods")]
    [Authorize]
    public class CatalystPeriodController : ControllerBase
    {
        //private readonly ProductsService _productService;
        private readonly IConfiguration _configuration;

        public CatalystPeriodController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        // GET: api/values
        [HttpGet]
        public IEnumerable<CatalysePeriod> Get()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();
                //var result = connection.Query<CatalysePeriod>(@"SELECT * FROM Catalyst_Periods");
                var result = connection.Query<CatalysePeriod>("App_Sel_ValueNamePairs", new { PairName = "Catalyst_Periods", IntVar1 = 0, StrVar1 = " " }, commandType: CommandType.StoredProcedure);



                return result;
            }


        }
    }
}