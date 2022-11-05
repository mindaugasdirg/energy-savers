using System.ComponentModel.DataAnnotations;

namespace EnergySavers.API.Models.Database
{
    public class User
    {
        [Required]
        [Key]
        public string Id { get; set; }

        [Required]
        public string UserName { get; set; }
    }
}