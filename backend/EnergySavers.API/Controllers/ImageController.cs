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
			var labels = imageService.ResolveLabels(image.Image);
			var images = imageService.GetSimilarImages(image.Image);
			var result = new{
				Label = labels[0],
				Images = images
			};

            return Ok(result);
        }
    }
}