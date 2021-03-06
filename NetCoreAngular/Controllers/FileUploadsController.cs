﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NetCoreAngular.Helpers;
using NetCoreAngular.Models;

namespace NetCoreAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadsController : ControllerBase
    {
        private readonly JobContext _context;
        private string _storageAccount;

        public FileUploadsController(JobContext context, IConfiguration config)
        {
            _context = context;
            _storageAccount = config.GetConnectionString("StorageAccount");
        }

        // GET: api/FileUploads
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FileUpload>>> GetFileUpload()
        {
            return await _context.FileUpload.ToListAsync();
        }

        // GET: api/FileUploads/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FileUpload>> GetFileUpload(int id)
        {
            var fileUpload = await _context.FileUpload.FindAsync(id);

            if (fileUpload == null)
            {
                return NotFound();
            }

            return fileUpload;
        }

        // PUT: api/FileUploads/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFileUpload(int id, FileUpload fileUpload)
        {
            if (id != fileUpload.Id)
            {
                return BadRequest();
            }

            _context.Entry(fileUpload).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FileUploadExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/FileUploads
        [HttpPost]
        public async Task<ActionResult<FileUpload>> PostFileUpload(IFormFile file, 
            [FromForm] int imageId, [FromForm] int recruiterId, [FromForm] int companyId)
        {
            FileUpload fileUpload = null;

            try
            {
                if (file == null)
                {
                    return BadRequest("No file received from the upload");
                }
                
                if (string.IsNullOrEmpty(_storageAccount))
                {
                    return BadRequest("No StorageAccount found in appsettings.json");
                }

                if (StorageHelper.IsImage(file))
                {
                    if (file.Length > 0)
                    {
                        using (Stream stream = file.OpenReadStream())
                        {
                            fileUpload = await StorageHelper.UploadFileToStorage(stream, "images", file.FileName, _storageAccount);
                        }
                    }
                }
                else
                {
                    return new UnsupportedMediaTypeResult();
                }

                if (fileUpload != null)
                {
                    _context.FileUpload.Add(fileUpload);
                    await _context.SaveChangesAsync();

                    if (recruiterId != 0)
                    {
                        await UpdateRecruiterImage(recruiterId, fileUpload.Id);
                    }

                    if (companyId != 0)
                    {
                        await UpdateCompanyImage(companyId, imageId);
                    }

                   await DeleteFileUpload(imageId);

                    return new AcceptedResult(fileUpload.Uri, fileUpload);
                }
                else
                    return BadRequest("Look like the image couldnt upload to the storage");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [NonAction]
        private async Task UpdateCompanyImage(int companyId, int newImageId)
        {
            var company = await _context.Company
                .SingleOrDefaultAsync(x => x.Id == companyId);

            if (company != null && newImageId > 0)
            {
                company.ImageId = newImageId;

                await _context.SaveChangesAsync();
            }
        }

        [NonAction]
        private async Task UpdateRecruiterImage(int recruiterId, int newImageId)
        {
            var recruiter = await _context.Recruiter
                .SingleOrDefaultAsync(x => x.Id == recruiterId);

            if (recruiter != null && newImageId > 0)
            {
                recruiter.ImageId = newImageId;

                await _context.SaveChangesAsync();
            }
        }

        // DELETE: api/FileUploads/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FileUpload>> DeleteFileUpload(int id)
        {
            var fileUpload = await _context.FileUpload.FindAsync(id);
            if (fileUpload == null)
            {
                return NotFound();
            }

            _context.FileUpload.Remove(fileUpload);
            await _context.SaveChangesAsync();

            await StorageHelper.DeleteFile(fileUpload.Uri, _storageAccount);

            return fileUpload;
        }

        private bool FileUploadExists(int id)
        {
            return _context.FileUpload.Any(e => e.Id == id);
        }
    }
}
