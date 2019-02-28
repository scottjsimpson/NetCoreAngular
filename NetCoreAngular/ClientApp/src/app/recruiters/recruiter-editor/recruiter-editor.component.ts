import { Component, OnInit } from '@angular/core';
import { RecruiterService } from 'src/app/services/recruiter.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Recruiter } from 'src/app/models/recruiter';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { RecruiterDto } from 'src/app/models/recruiterDto';
import { FileUpload } from 'src/app/models/file-upload';

@Component({
  selector: 'app-recruiter-editor',
  templateUrl: './recruiter-editor.component.html',
  styleUrls: ['./recruiter-editor.component.css']
})
export class RecruiterEditorComponent implements OnInit {
  recruiter: Recruiter = <Recruiter>{ image: null };
  title: string;
  url: any = '';

  recruiterForm: FormGroup;

  validation_messages = {
    'name': [
      { type: 'required', message: 'Full name is required' }
    ],
    'role': [
      { type: 'required', message: 'Role is required' }
    ],
    'location': [
      { type: 'required', message: 'Location is required' }
    ],
    'tel': [
      { type: 'required', message: 'Telephone is required' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'description': [
      { type: 'required', message: 'Description is required' },
      { type: 'maxlength', message: 'Description cannot be more than 255 characters long' }
    ]
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private recruiterService: RecruiterService,
              private fileUploadService: FileUploadService) { }

  ngOnInit() {
    const isAdd = !this.route.snapshot.params.id;
    this.title = isAdd ? 'Create' : 'Edit';
    if (!isAdd) {
      this.recruiter = this.route.snapshot.data.recruiter;
    }
    this.url = '/assets/images/placeholder.jpg';
    if (this.recruiter.image && this.recruiter.image.uri) {
      this.url = this.recruiter.image.uri;
    }
    this.createForm();
  }

  save(recruiter: Recruiter) {
    this.recruiterService.saveRecruiter(recruiter)
      .subscribe(response => {
        this.router.navigate(['/recruiters']);
      }, error => {
        console.log(error);
      });
  }

  createForm() {
    this.recruiterForm = this.fb.group({
      id: [this.recruiter.id || 0, Validators.nullValidator],
      name: [this.recruiter.name || '', Validators.required],
      role: [this.recruiter.role || '', Validators.required],
      location: [this.recruiter.location || '', Validators.required],
      tel: [this.recruiter.tel || '', Validators.required],
      email: new FormControl(this.recruiter.email || '', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      description: new FormControl(this.recruiter.description || '', Validators.compose([
        Validators.required,
        Validators.maxLength(255)
      ])),
      imageId: [this.recruiter.imageId || null],
      image: [this.recruiter.image || null]
    });
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const file: File = (event.target.files as FileList)[0];
      const recruiterId = this.recruiterForm.get('id');
      const imageId = this.recruiterForm.get('imageId');

      // upload and assign the response
      this.fileUploadService
        .saveRecruiterImage(file, recruiterId.value, imageId.value)
        .subscribe(response => {
          const image = <FileUpload>response;
          imageId.setValue(image.id);
          this.url = image.uri;
        },
        error => {
            console.log(error)
        });
    }
  }
}
