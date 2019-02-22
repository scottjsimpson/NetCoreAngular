import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { RecruiterService } from '../services/recruiter.service';

@Injectable()
export class RecruiterResolver implements Resolve<any> {
  constructor(private recruiterService: RecruiterService) {}

  resolve(route: ActivatedRouteSnapshot) {
      const idParam = +route.params['id'];
      return this.recruiterService.getRecruiter(idParam);
    }
}
