import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recruiter } from '../../models/recruiter';
import { RecruiterService } from '../../services/recruiter.service';

@Component({
  selector: 'app-recruiter-list',
  templateUrl: './recruiter-list.component.html',
  styleUrls: ['./recruiter-list.component.css']
})
export class RecruiterListComponent implements OnInit {

  recruiters: Observable<Array<Recruiter>>;

  constructor(private recruiterService: RecruiterService) { }

  ngOnInit() {
    this.recruiters = this.recruiterService.getRecruiters();
  }

}
