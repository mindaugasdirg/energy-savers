using Microsoft.AspNetCore.Mvc;

namespace EnergySavers.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ActivitiesController : ControllerBase
    {
        [HttpGet("{id}")]
        public IActionResult GetActivity(string id)
        {
            return Ok();
        }

        // public IActionResult GetUserActivities()
        // {
        //     return Ok(new List<object>());
        // }
    }
}