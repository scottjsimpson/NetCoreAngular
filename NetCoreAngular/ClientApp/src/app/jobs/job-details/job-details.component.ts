import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '../../models/job';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  job: Job;

  constructor(private jobService: JobService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.job = this.route.snapshot.data.job;
  }

  deleteJob(job: Job) {
    if (window.confirm('Are you sure you want to delete \'' + job.title + '\'')) {
      this.jobService.deleteJob(+job.id)
        .subscribe(response => this.router.navigate(['/jobs']));
    }
  }
}
