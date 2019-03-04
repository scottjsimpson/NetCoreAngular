using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using NetCoreAngular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular.Model
{
    public static class DbInitializer
    {
        public static void Initialize(JobContext context)
        {
            context.Database.Migrate();

            if (!context.FileUpload.Any())
            {
                var images = new List<FileUpload>();
                images.Add(new FileUpload() { Uri = "../../assets/images/sarah.jpg" });
                images.Add(new FileUpload() { Uri = "../../assets/images/john.jpg" });
                images.Add(new FileUpload() { Uri = "../../assets/images/sam.jpg" });
                images.Add(new FileUpload() { Uri = "../../assets/images/janet.jpg" });
                images.Add(new FileUpload() { Uri = "../../assets/images/company.png" });

                foreach (var image in images)
                {
                    context.FileUpload.Add(image);
                }

                context.SaveChanges();
            }

            // Look for any recruiters.
            if (!context.Recruiter.Any())
            {
                var recruiters = new List<Recruiter>();
                recruiters.Add(new Recruiter()
                {
                    Name = "Sarah Smith",
                    Role = "Recruitment Consultant",
                    Location = "Belfast",
                    Email = "s.smith@netcoreng.com",
                    Tel = "+44 (0) 2892 14521485",
                    ImageId = context.FileUpload
                    .FirstOrDefault(x => x.Uri.Contains("sarah.jpg")).Id,
                    Description = ""
                });
                context.Recruiter.Add(new Recruiter()
                {
                    Name = "John Black",
                    Role = "Recruiter",
                    Location = "London",
                    Email = "j.black@netcoreng.com",
                    Tel = "+44 (0) 78528848481",
                    ImageId = context.FileUpload
                    .FirstOrDefault(x => x.Uri.Contains("john.jpg")).Id,
                    Description = ""
                });
                context.Recruiter.Add(new Recruiter()
                {
                    Name = "Sam Jones",
                    Role = "Recruiting Wizard",
                    Location = "Edinburgh",
                    Email = "s.jones@netcoreng.com",
                    Tel = "+44 (0) 78528848481",
                    ImageId = context.FileUpload
                    .FirstOrDefault(x => x.Uri.Contains("sam.jpg")).Id,
                    Description = ""
                });
                context.Recruiter.Add(new Recruiter()
                {
                    Name = "Janet White",
                    Role = "Guru",
                    Location = "Belfast",
                    Email = "j.white@netcoreng.com",
                    Tel = "+44 (0) 13156418548",
                    ImageId = context.FileUpload
                    .FirstOrDefault(x => x.Uri.Contains("janet.jpg")).Id,
                    Description = ""
                });

                foreach (var r in recruiters)
                {
                    context.Recruiter.Add(r);
                }

                context.SaveChanges();
            }

            // Look for any companies.
            if (!context.Company.Any())
            {
                var companies = new List<Company>();
                companies.Add(new Company()
                {
                    Name = "Company Name",
                    Email = "email@company.com",
                    Tel = "+44 (0) 202898848411",
                    ImageId = context.FileUpload
                    .FirstOrDefault(x => x.Uri.Contains("company.png")).Id,
                });

                foreach (var c in companies)
                {
                    context.Company.Add(c);
                }

                context.SaveChanges();
            }

            // Look for any jobs.
            if (!context.Job.Any())
            {
                var jobs = new List<Job>();
                jobs.Add(new Job()
                {
                    Title = "Database Admin",
                    Description = "Very good role",
                    Location = "Belfast",
                    Salary = 123,
                    DatePosted = DateTime.Now,
                    RecruiterId = context.Recruiter.FirstOrDefault().Id,
                    CompanyId = context.Company.FirstOrDefault().Id
                });

                foreach (var j in jobs)
                {
                    context.Job.Add(j);
                }

                context.SaveChanges();
            }
        }
    }
}
