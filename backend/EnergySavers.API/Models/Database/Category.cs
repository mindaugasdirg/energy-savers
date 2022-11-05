using System.ComponentModel.DataAnnotations;

namespace EnergySavers.API.Models.Database
{
    public class Category
    {
        [Required]
        [Key]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}