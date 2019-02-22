import { Injectable } from '@angular/core';
import { Recruiter } from '../models/recruiter';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {

  readonly apiRoute = '/api/recruiters/';

  constructor(private http: HttpClient) { }

  getRecruiters(): Observable<Array<Recruiter>> {
    return this.http.get<Array<Recruiter>>(this.apiRoute)
      .pipe(catchError(this.handleError<Array<Recruiter>>('getRecruiters', [])));
  }

  getRecruiter(id: number): Observable<Recruiter> {
    return this.http.get<Recruiter>(this.apiRoute + id)
      .pipe(catchError(this.handleError<Recruiter>('getRecruiter')));
  }

  saveRecruiter(recruiter) {
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    if (recruiter.id) {
      // update existing
      return this.http.put<Recruiter>(this.apiRoute + recruiter.id, JSON.stringify(recruiter), options)
        .pipe(catchError(this.handleError<Recruiter[]>('updateRecruiter', [])));
    }
    // create new
    return this.http.post<Recruiter>(this.apiRoute, JSON.stringify(recruiter), options)
      .pipe(catchError(this.handleError<Recruiter[]>('createRecruiter', [])));
  }

  deleteRecruiter(id: number) {
    return this.http.delete<Recruiter>(this.apiRoute + id.toString())
      .pipe(catchError(this.handleError<Recruiter[]>('deleteRecruiter', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
