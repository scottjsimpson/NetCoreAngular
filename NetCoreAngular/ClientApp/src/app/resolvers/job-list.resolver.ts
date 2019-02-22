import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { JobService } from '../services/job.service';

@Injectable()
export class JobListResolver implements Resolve<any> {
    constructor(private jobService: JobService) {}

    resolve() {
        return this.jobService.getJobs();
    }
}
