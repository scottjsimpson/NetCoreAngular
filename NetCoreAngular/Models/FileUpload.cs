using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular.Models
{
    public class FileUpload
    {
        public int Id { get; set; }
        public int? Ref { get; set; }
        public string Type { get; set; }
        public string Filename { get; set; }
        public string Uri { get; set; }
    }
}
