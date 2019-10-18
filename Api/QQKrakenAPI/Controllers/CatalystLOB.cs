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

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace QQKrakenAPI.Controllers
{
    [Route("api/v1/catalyst-lobs")]
    public class CatalystLOBController : ControllerBase
    {
        //private readonly ProductsService _productService;
        private readonly IConfiguration _configuration;

        public CatalystLOBController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        // GET: api/values
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