using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCoreAngular.Models;

namespace NetCoreAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecruitersController : ControllerBase
    {
        private readonly JobContext _context;

        public RecruitersController(JobContext context)
        {
            _context = context;
        }

        // GET: api/Recruiters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recruiter>>> GetRecruiter()
        {
            return await _context.Recruiter
                .Include(x => x.Image)
                .ToListAsync();
        }

        // GET: api/Recruiters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Recruiter>> GetRecruiter(int id)
        {
            var recruiter = await _context.Recruiter
                .Include(x => x.Image)
                .FirstOrDefaultAsync(x => x.Id.Equals(id));

            if (recruiter == null)
            {
                return NotFound();
            }

            return recruiter;
        }

        // PUT: api/Recruiters/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecruiter(int id, Recruiter recruiter)
        {
            if (id != recruiter.Id)
            {
                return BadRequest();
            }

            _context.Entry(recruiter).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecruiterExists(id))
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

        // POST: api/Recruiters
        [HttpPost]
        public async Task<ActionResult<Recruiter>> PostRecruiter(Recruiter recruiter)
        {
            _context.Recruiter.Add(recruiter);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecruiter", new { id = recruiter.Id }, recruiter);
        }

        // DELETE: api/Recruiters/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Recruiter>> DeleteRecruiter(int id)
        {
            var recruiter = await _context.Recruiter.FindAsync(id);
            if (recruiter == null)
            {
                return NotFound();
            }

            RemoveJobAllocations(id);

            _context.Recruiter.Remove(recruiter);
            await _context.SaveChangesAsync();

            return recruiter;
        }

        private void RemoveJobAllocations(int id)
        {
            var recruiterJobs = _context.Job
                .Where(x => x.RecruiterId == id);

            foreach (var r in recruiterJobs)
            {
                r.RecruiterId = null;
            }                
        }

        private bool RecruiterExists(int id)
        {
            return _context.Recruiter.Any(e => e.Id == id);
        }
    }
}
