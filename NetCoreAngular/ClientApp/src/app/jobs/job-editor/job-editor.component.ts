import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Job } from 'src/app/models/job';
import { Recruiter } from 'src/app/models/recruiter';
import { RecruiterService } from 'src/app/services/recruiter.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-job-editor',
  templateUrl: './job-editor.component.html',
  styleUrls: ['./job-editor.component.css']
})
export class JobEditorComponent implements OnInit {

  job: Job = <Job>{ recruiter: {} };
  recruiters: Observable<Array<Recruiter>>;
  title: string;

  jobForm: FormGroup;

  validation_messages = {
    'title': [
      { type: 'required', message: 'Full name is required' }
    ],
    'location': [
      { type: 'required', message: 'Location is required' }
    ],
    'salary': [
      { type: 'pattern', message: 'Salary should be numeric' }
    ],
    'recruiterId': [
      { type: 'required', message: 'Contact is required' }
    ],
    'description': [
      { type: 'required', message: 'Description is required' },
      { type: 'maxlength', message: 'Description cannot be more than 255 characters long' }
    ]
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private jobService: JobService,
              private recruiterService: RecruiterService) { }

  ngOnInit() {
    this.recruiters = this.recruiterService.getRecruiters();
    const isAdd = !this.route.snapshot.params.id;
    this.title = isAdd ? 'Create' : 'Edit';
    if (!isAdd) {
      this.job = this.route.snapshot.data.job;
    }

    this.createForm();
  }

  save(job: Job) {
    this.jobService.saveJob(job)
      .subscribe(response => {
        this.router.navigate(['/jobs']);
      }, error => {
        console.log(error);
      });
  }

  createForm() {
    this.jobForm = this.fb.group({
      id: [this.job.id || 0, Validators.nullValidator],
      title: [this.job.title || '', Validators.required],
      location: [this.job.location || '', Validators.required],
      salary: [this.job.salary || '', Validators.pattern('^[0-9]+$')],
      recruiterId: [this.job.recruiterId || '', Validators.required],
      description: new FormControl(this.job.description || '', Validators.compose([
        Validators.required,
        Validators.maxLength(255)
      ])),
    })
  }
}
