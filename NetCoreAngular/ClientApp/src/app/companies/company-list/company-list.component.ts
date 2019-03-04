import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companies: Array<Company>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.companies = this.route.snapshot.data.companies;
  }
}
