using EnergySavers.API.Enums;
using EnergySavers.API.Models.Response.Dtos;
using EnergySavers.API.Models.Response.Models;
using Microsoft.AspNetCore.Mvc;

namespace EnergySavers.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EnergyController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetEnergyStats()
        {
            return Ok(new EnergyStatResponseDto(new EnergyStatResponse("general", 69, 42)));
        }

        [HttpGet("categories")]
        public IActionResult GetEnergyStatsByCategory([FromQuery] EnergyType energyType)
        {
            switch (energyType)
            {
                case EnergyType.Used: return Ok(new EnergyStatsResponseDto(new List<EnergyValueResponse>()
                    {
                        new EnergyValueResponse("transport", 50),
                        new EnergyValueResponse("food", 10)
                    }));
                case EnergyType.Optimal: return Ok(new EnergyStatsResponseDto(new List<EnergyValueResponse>()
                    {
                        new EnergyValueResponse("transport", 1),
                        new EnergyValueResponse("food", 5)
                    }));
                default: throw new Exception("Invalid energy type");
            }
        }
    }
}