import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatRadioModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { JobDetailsComponent } from './jobs/job-details/job-details.component';
import { JobListResolver } from './resolvers/job-list.resolver';
import { JobResolver } from './resolvers/job.resolver';
import { JobService } from './services/job.service';
import { RecruiterService } from './services/recruiter.service';
import { JobThumbnailComponent } from './jobs/job-list/job-thumbnail.component';
import { RecruiterDetailsComponent } from './recruiters/recruiter-details/recruiter-details.component';
import { RecruiterListComponent } from './recruiters/recruiter-list/recruiter-list.component';
import { RecruiterThumbnailComponent } from './recruiters/recruiter-list/recruiter-thumbnail.component';
import { JobEditorComponent } from './jobs/job-editor/job-editor.component';
import { RecruiterResolver } from './resolvers/recruiter.resolver';
import { RecruiterEditorComponent } from './recruiters/recruiter-editor/recruiter-editor.component';
import { FileUploadService } from './services/file-upload.service';
import { CompanyDetailsComponent } from './companies/company-details/company-details.component';
import { CompanyListComponent } from './companies/company-list/company-list.component';
import { CompanyEditorComponent } from './companies/company-editor/company-editor.component';
import { CompanyService } from './services/company.service';
import { CompanyResolver } from './resolvers/company.resolver';
import { CompanyListResolver } from './resolvers/company-list.resolver';
import { CompanyThumbnailComponent } from './companies/company-list/company-thumbnail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    JobListComponent,
    JobDetailsComponent,
    JobThumbnailComponent,
    JobEditorComponent,
    RecruiterListComponent,
    RecruiterDetailsComponent,
    RecruiterThumbnailComponent,
    RecruiterEditorComponent,
    CompanyDetailsComponent,
    CompanyListComponent,
    CompanyEditorComponent,
    CompanyThumbnailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'companies', component: CompanyListComponent, resolve: { companies: CompanyListResolver } },
      { path: 'companies/new', component: CompanyEditorComponent, pathMatch: 'full' },
      { path: 'companies/:id/edit', component: CompanyEditorComponent, resolve: { company: CompanyResolver }, pathMatch: 'full' },
      { path: 'companies/:id', component: CompanyDetailsComponent, resolve: { company: CompanyResolver } },
      { path: 'jobs', component: JobListComponent, resolve: { jobs: JobListResolver } },
      { path: 'jobs/new', component: JobEditorComponent, pathMatch: 'full' },
      { path: 'jobs/:id/edit', component: JobEditorComponent, resolve: { job: JobResolver }, pathMatch: 'full' },
      { path: 'jobs/:id', component: JobDetailsComponent, resolve: { job: JobResolver } },
      { path: 'recruiters', component: RecruiterListComponent },
      { path: 'recruiters/new', component: RecruiterEditorComponent, pathMatch: 'full' },
      { path: 'recruiters/:id/edit', component: RecruiterEditorComponent, resolve: { recruiter: RecruiterResolver }, pathMatch: 'full' },
      { path: 'recruiters/:id', component: RecruiterDetailsComponent, resolve: { recruiter: RecruiterResolver } },
    ]),
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatCheckboxModule,
      MatInputModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatCardModule,
      MatDialogModule,
      MatIconModule,
      MatListModule,
      MatSidenavModule,
      MatRadioModule,
      MatTabsModule,
      MatToolbarModule,
      HttpClientModule
  ],
  providers: [
    FileUploadService,
    JobService,
    JobListResolver,
    JobResolver,
    RecruiterService,
    RecruiterResolver,
    CompanyService,
    CompanyResolver,
    CompanyListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
