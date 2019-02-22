import { Component, OnInit } from '@angular/core';
import { Recruiter } from 'src/app/models/recruiter';
import { RecruiterService } from 'src/app/services/recruiter.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-details',
  templateUrl: './recruiter-details.component.html',
  styleUrls: ['./recruiter-details.component.css']
})
export class RecruiterDetailsComponent implements OnInit {

  recruiter: Recruiter;

  constructor(private recruiterService: RecruiterService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.recruiter = this.route.snapshot.data.recruiter;
  }

  deleteRecruiter(recruiter: Recruiter) {
    if (window.confirm('Are you sure you want to delete \''+ recruiter.name +'\'')) {
      this.recruiterService.deleteRecruiter(+recruiter.id)
        .subscribe(response => this.router.navigate(['/recruiters']));
    }
  }

  goBack() {
    window.history.back();
  }
}
