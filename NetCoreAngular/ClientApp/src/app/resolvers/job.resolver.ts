import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { JobService } from '../services/job.service';

@Injectable()
export class JobResolver implements Resolve<any> {
    constructor(private jobService: JobService) {}

    resolve(route: ActivatedRouteSnapshot) {
        const idParam = +route.params['id'];
        return this.jobService.getJob(idParam);
    }
}
