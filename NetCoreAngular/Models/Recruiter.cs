using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;

namespace NetCoreAngular.Models
{
    public class RecruiterDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }
        public string Tel { get; set; }

        public int? ImageId { get; set; }

        public IFormFile Image { get; set; }
    }

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

        public int? ImageId { get; set; }
        public FileUpload Image { get; set; }
    }
}
