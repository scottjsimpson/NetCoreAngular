using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NetCoreAngular.Models
{
    public class Recruiter
    {
        public int Id { get; set; }

        [Required()]
        public string Name { get; set; }

        [Required()]
        public string Role { get; set; }

        [Required()]
        public string Description { get; set; }

        [Required()]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required()]
        public string Location { get; set; }

        [Required()]
        [DataType(DataType.PhoneNumber)]
        public string Tel { get; set; }

        public string Image { get; set; }
    }
}
