using EnergySavers.API.Models.Response.Dtos;
using EnergySavers.API.Models.Response.Models;
using Microsoft.AspNetCore.Mvc;

namespace EnergySavers.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CarbonController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetCarbonStats()
        {
            return Ok(new CarbonStatResponseDto(new CarbonStatResponse("general", 69, 42)));
        }

        [HttpGet("categories")]
        public IActionResult GetCarbonStatsByCategory()
        {
            return Ok(new CarbonStatsResponseDto(new List<CarbonStatResponse>()
            {
                new CarbonStatResponse("transport", 50, 44),
                new CarbonStatResponse("food", 10, 5),
                new CarbonStatResponse("food", 10, 5)
            }));
        }
    }
}