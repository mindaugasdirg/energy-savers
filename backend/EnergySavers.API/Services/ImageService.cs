using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using EnergySavers.Api.Models.Options;
using Google.Cloud.Vision.V1;
using Microsoft.Extensions.Options;

namespace EnergySavers.API.Services
{
	public interface IImageService
	{
		List<string> ResolveLabels(string imageBase64);
		List<string> GetSimilarImages(string imageBase64);
	}

    public class ImageService : IImageService
    {
		private HttpClient httpClient = new HttpClient();
		private readonly ClimateApiOptions options;

		public ImageService(IOptions<ClimateApiOptions> options)
		{
			this.options = options.Value;
		}

        public List<string> ResolveLabels(string imageBase64)
		{
			var labels = new List<string>();
			byte[] binaryImage = Convert.FromBase64String(imageBase64);
            var client = ImageAnnotatorClient.Create();
            var image = Image.FromBytes(binaryImage);
            var detectedLabels = client.DetectLabels(image);
			labels = detectedLabels.Select(label => label.Description).ToList();
			// SearchActivity(labels[0]);
			// ShootRequest();
			return labels;
		}

		public List<string> GetSimilarImages(string imageBase64)
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

            var results = response.Responses[0].WebDetection.VisuallySimilarImages;
            
            return results.Select(x => x.Url).ToList();
		}



		private string GetEnergyData(){


			return "";
		} 

		// private void SearchActivity(string label){
		// 	var url = "https://beta3.api.climatiq.io/search?query=light+duty+trucks&year=2021";
		// 	httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", options.ApiKey);
		// 	var result = httpClient.GetAsync(url).Result;	
		// 	JsonNode data = JsonSerializer.Deserialize<JsonNode>(result.Content.ReadAsStream());
		// 	Console.WriteLine(data["results"].AsArray()[0]["activity_id"].GetValue<string>());
		// 	Console.WriteLine(data["results"].AsArray()[0]["activity_id"].GetValue<string>());
		// }

		// private void ShootRequest(){
		// 	var url = "https://beta3.api.climatiq.io/estimate";
		// 	httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", options.ApiKey);
		// 	string jsonString =
		// 	@"{
		// 		""emission_factor"": {
		// 			""activity_id"": ""heat-and-steam-type_purchased""
		// 		},
		// 		""parameters"": {
		// 			""energy"": 100,
		// 			""energy_unit"": ""kWh""
		// 		}
		// 	}
		// 	";
		// 	var content = new StringContent(jsonString, Encoding.UTF8, "application/json");
		// 	var result = httpClient.PostAsync(url, content).Result;	
		// 	JsonNode data = JsonSerializer.Deserialize<JsonNode>(result.Content.ReadAsStream());
		// 	Console.WriteLine(data["co2e"].GetValue<double>());
		// }
	}
}