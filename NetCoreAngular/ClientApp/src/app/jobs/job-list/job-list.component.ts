import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobs: Array<Job>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.jobs = this.route.snapshot.data.jobs;
  }
}
