using EnergySavers.API.Models.Request;
using EnergySavers.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace EnergySavers.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImageController : ControllerBase
    {
		private IImageService imageService;
		public ImageController(IImageService imageService)
		{
			this.imageService = imageService;
		}

        [HttpPost]
        public IActionResult PostImage(ImageRequest image)
        {
			var result = imageService.GetItems(image.Image);

            return Ok(result);
        }
    }
}