using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Skippit_BLL;
using Skippit_BLL.Helpers; 

namespace Skippit_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        public static ICrud_BLL test_BLL; 
        public TestController(ICrud_BLL _test_BLL)
        {
            test_BLL = _test_BLL; 
        }
        [HttpGet]
        public string read()
        {
            return test_BLL.Read(); 
        }
    }
}