using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using EnergySavers.API.Models.Response.Models;
using Google.Cloud.Vision.V1;
using Microsoft.Extensions.Options;

namespace EnergySavers.API.Services
{
	public interface IImageService
	{
		List<ItemResponse> GetItems(string imageBase64);
	}

    public class ImageService : IImageService
    {
		private HttpClient httpClient = new HttpClient();
		private Random rnd = new Random();

		private string[] providers = {
			"Amazon",
			"Ebay",
			"Eco-shop",
			"Stuff-all-day.com",
			"Target",
			"Etsy",
			"Vinted",
			"Easy",
			"AliExpress"
		};

		public ImageService()
		{
		}

		public List<ItemResponse> GetItems(string imageBase64)
		{
			var labels = this.ResolveLabels(imageBase64);
			var images = this.GetSimilarImages(imageBase64);

			var item1 = new ItemResponse(labels[0], images[0], this.GetProvider(), this.GetValue());
			var item2 = new ItemResponse(labels[0], images[1], this.GetProvider(), this.GetValue());

			return new[]{item1, item2}.ToList();
		}

        private List<string> ResolveLabels(string imageBase64)
		{
			var labels = new List<string>();
			byte[] binaryImage = Convert.FromBase64String(imageBase64);
            var client = ImageAnnotatorClient.Create();
            var image = Image.FromBytes(binaryImage);
            var detectedLabels = client.DetectLabels(image);
			labels = detectedLabels.Select(label => label.Description).ToList();
			return labels;
		}

		private List<string> GetSimilarImages(string imageBase64)
		{
			var client = ImageAnnotatorClient.Create();
            var psClient = ProductSearchClient.Create();
			byte[] binaryImage = Convert.FromBase64String(imageBase64);
            var image = Image.FromBytes(binaryImage);
            
            var request = new AnnotateImageRequest
            {
                Image = image,
                Features = { new Feature { Type = Feature.Types.Type.WebDetection, MaxResults = 2 } }
            };

            var response = client.BatchAnnotateImages(new[] { request });

            var result = response.Responses[0].WebDetection;

			return result?.FullMatchingImages.Count >= 2 ?
				result.FullMatchingImages.Select(x => x.Url).ToList()
				: result?.VisuallySimilarImages.Select(x => x.Url).ToList();
		}

		private int GetValue()
		{
			return rnd.Next(100);
		}

		private string GetProvider()
		{
			return this.providers[rnd.Next(providers.Length)];
		}

	}
}