using Google.Cloud.Vision.V1;

namespace EnergySavers.API.Services
{
	public interface IImageService
	{
		List<string> ResolveLabels(string imageBase64);
	}

    public class ImageService : IImageService
    {
        public List<string> ResolveLabels(string imageBase64)
		{
			var labels = new List<string>();
			byte[] binaryImage = Convert.FromBase64String(imageBase64);
            var client = ImageAnnotatorClient.Create();
            var image = Image.FromBytes(binaryImage);
            var detectedLabels = client.DetectLabels(image);
			labels = detectedLabels.Select(label => label.Description).ToList();
			return labels;
		}
    }
}