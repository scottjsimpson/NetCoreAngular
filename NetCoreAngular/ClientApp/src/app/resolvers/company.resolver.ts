import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CompanyService } from '../services/company.service';

@Injectable()
export class CompanyResolver implements Resolve<any> {
    constructor(private companyService: CompanyService) {}

    resolve(route: ActivatedRouteSnapshot) {
        const idParam = +route.params['id'];
        return this.companyService.getCompany(idParam);
    }
}
