import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileUpload } from 'src/app/models/file-upload';

@Component({
  selector: 'app-company-editor',
  templateUrl: './company-editor.component.html',
  styleUrls: ['./company-editor.component.css']
})
export class CompanyEditorComponent implements OnInit {
  company: Company = <Company>{ image: null };
  title: string;
  url: any = '';

  companyForm: FormGroup;

  validation_messages = {
    'name': [
      { type: 'required', message: 'Full name is required' }
    ],
    'tel': [
      { type: 'required', message: 'Telephone is required' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
  }

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private fileUploadService: FileUploadService) { }

  ngOnInit() {
    const isAdd = !this.route.snapshot.params.id;
    this.title = isAdd ? 'Create' : 'Edit';
    if (!isAdd) {
      this.company = this.route.snapshot.data.company;
    }
    this.url = '/assets/images/placeholder.jpg';
    if (this.company.image && this.company.image.uri) {
      this.url = this.company.image.uri;
    }
    this.createForm();
  }

  save(company: Company) {
    this.companyService.saveCompany(company)
      .subscribe(response => {
        this.router.navigate(['/companies']);
      }, error => {
        console.log(error);
      });
  }

  createForm() {
    this.companyForm = this.fb.group({
      id: [this.company.id || 0, Validators.nullValidator],
      name: [this.company.name || '', Validators.required],
      tel: [this.company.tel || '', Validators.required],
      email: new FormControl(this.company.email || '', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      imageId: [this.company.imageId || null],
      image: [this.company.image || null]
    });
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const file: File = (event.target.files as FileList)[0];
      const companyId = this.companyForm.get('id');
      const imageId = this.companyForm.get('imageId');

      // upload and assign the response
      this.fileUploadService
        .saveCompanyImage(file, companyId.value, imageId.value)
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
