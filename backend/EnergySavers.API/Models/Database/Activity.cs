using System.ComponentModel.DataAnnotations;

namespace Models.Database
{
    public class Activity
    {
        [Required]
        [Key]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int Co2 { get; set; }

        [Required]
        public int Energy { get; set; }
    }
}