import { Injectable } from '@angular/core';
import { Job } from '../models/job';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  readonly apiRoute: string = '/api/jobs/';

  constructor(private http: HttpClient) { }

  getJobs(): Observable<Array<Job>> {
    return this.http.get<Array<Job>>(this.apiRoute)
      .pipe(catchError(this.handleError<Array<Job>>('getJobs', [])));
  }

  getJob(id: number): Observable<Job> {
    return this.http.get<Job>(this.apiRoute + id)
      .pipe(catchError(this.handleError<Job>('getJob')));
  }

  saveJob(job: Job) {
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    if (job.id) {
      // update existing
      return this.http.put<Job>(this.apiRoute + job.id, JSON.stringify(job), options)
        .pipe(catchError(this.handleError<Job[]>('updateJob', [])));
    }
    // create new
    return this.http.post<Job>(this.apiRoute, JSON.stringify(job), options)
      .pipe(catchError(this.handleError<Job[]>('createJob', [])));
  }

  deleteJob(id: number) {
    return this.http.delete<Job>(this.apiRoute + id.toString())
      .pipe(catchError(this.handleError<Job[]>('deleteJob', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
