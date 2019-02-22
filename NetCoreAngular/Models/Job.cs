using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular.Models
{
    public class Job
    {
        public int Id { get; set; }
        [Required()]
        public string Title { get; set; }

        [Required()]
        public string Location { get; set; }

        [DisplayName("Date posted")]
        [DisplayFormat(DataFormatString = "{0:d}")]
        public DateTime DatePosted { get; set; }

        public int? Salary { get; set; }

        [Required()]
        [DataType(DataType.MultilineText)]
        public string Description { get; set; }

        public int? RecruiterId { get; set; }
        public virtual Recruiter Recruiter { get; set; }

        public int? CompanyId { get; set; }
        public virtual Company Company { get; set; }

        //public virtual ICollection<Technology> Technologies { get; set; }

        public Job()
        {
            DatePosted = DateTime.Now.Date;
        }
    }
}
