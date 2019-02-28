using Microsoft.EntityFrameworkCore;

namespace NetCoreAngular.Models
{
    public class JobContext : DbContext
    {
        public JobContext (DbContextOptions<JobContext> options)
            : base(options)
        {
        }

        public DbSet<Job> Job { get; set; }
        public DbSet<Recruiter> Recruiter { get; set; }
        public DbSet<Company> Company { get; set; }
        public DbSet<FileUpload> FileUpload { get; set; }
    }
}
