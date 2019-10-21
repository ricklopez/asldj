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
                var result = connection.Query<CatalysePeriod>(@"SELECT * FROM Catalyst_Periods");



                return result;
            }


        }
    }
}