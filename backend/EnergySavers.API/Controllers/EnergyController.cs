using EnergySavers.API.Enums;
using EnergySavers.API.Models.Response.Dtos;
using EnergySavers.API.Models.Response.Models;
using Google.Cloud.Vision.V1;
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

        [HttpGet("test")]
        public IActionResult Test()
        {
            var client = ImageAnnotatorClient.Create();
            var image = Image.FromUri("gs://cloud-samples-data/vision/using_curl/shanghai.jpeg");
            var labels = client.DetectLabels(image);

            Console.WriteLine("Labels (and confidence score):");
            Console.WriteLine(new String('=', 30));

            foreach (var label in labels)
            {
                Console.WriteLine($"{label.Description} ({(int)(label.Score * 100)}%)");
            }
            return Ok();
        }

        [HttpGet("test2")]
        public IActionResult Test2()
        {
            var client = ImageAnnotatorClient.Create();
            var psClient = ProductSearchClient.Create();
            var image = Image.FromUri("gs://cloud-samples-data/vision/using_curl/shanghai.jpeg");
            
            ProductSetName productSetName = new ProductSetName("junction-hack22esp-7102", "europe-west1", "productSetId");

            ProductSearchParams searchParams = new ProductSearchParams
            {
                ProductCategories = { "apparel" },
                ProductSetAsProductSetName = productSetName,
            };

            ImageContext imageContext = new ImageContext(){
                ProductSearchParams = searchParams
            };


            var featuresElement = new Feature(){MaxResults = 10, Type = Feature.Types.Type.ProductSearch};
            var features = new List<Feature>(){ featuresElement };

            var request = new AnnotateImageRequest
            {
                Image = image,
                ImageContext = imageContext,
                Features = { new Feature { Type = Feature.Types.Type.ProductSearch, MaxResults = 10 } }
            };

            var response = client.BatchAnnotateImages(new[] { request });

            var results = response.Responses;
             Console.WriteLine($"{results})");

            // foreach (var result in results)
            // {
            //     Console.WriteLine($"{result.Product.Name} ({(int)(result.Score * 100)}%)");
            // }
            return Ok();
        }

        [HttpGet("test3")]
        public IActionResult Test3()
        {
            ProductSetName productSetName = new ProductSetName("junction-hack22esp-7102", "europe-west1", "productSetId");
            ImageAnnotatorClient client = ImageAnnotatorClient.Create();
            ProductSearchParams searchParams = new ProductSearchParams
            {
                ProductCategories = { "apparel" },
                ProductSetAsProductSetName = productSetName,
            };

            var image = Image.FromUri("gs://cloud-samples-data/vision/using_curl/shanghai.jpeg");
            ProductSearchResults results = client.DetectSimilarProducts(image, searchParams);
            foreach (var result in results.Results)
            {
                Console.WriteLine($"{result.Product.DisplayName}: {result.Score}");
            }
            return Ok();
        }

        [HttpGet("test4")]
        public IActionResult Test4()
        {
            var client = ImageAnnotatorClient.Create();
            var psClient = ProductSearchClient.Create();
            var image = Image.FromFile("./h.jpg");
            // var image = Image.FromUri("gs://cloud-samples-data/vision/using_curl/shanghai.jpeg");
            
            var featuresElement = new Feature(){MaxResults = 10, Type = Feature.Types.Type.ProductSearch};
            var features = new List<Feature>(){ featuresElement };

            var request = new AnnotateImageRequest
            {
                Image = image,
                Features = { new Feature { Type = Feature.Types.Type.WebDetection, MaxResults = 10 } }
            };

            var response = client.BatchAnnotateImages(new[] { request });

            var results = response.Responses[0].WebDetection.VisuallySimilarImages;
            
            foreach (var result in results)
            {
                Console.WriteLine($"{result}");
            }

            return Ok();
        }
    }
}