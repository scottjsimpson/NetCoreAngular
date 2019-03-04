import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  company: Company;

  constructor(private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.company = this.route.snapshot.data.company;
  }

  deleteCompany(company: Company) {
    if (window.confirm('Are you sure you want to delete \'' + company.name + '\'')) {
      this.companyService.deleteCompany(+company.id)
        .subscribe(response => this.router.navigate(['/companies']));
    }
  }

  goBack() {
    window.history.back();
  }
}
