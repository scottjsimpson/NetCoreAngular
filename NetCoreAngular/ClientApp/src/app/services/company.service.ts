import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  readonly apiRoute: string = '/api/companies/';

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Array<Company>> {
    return this.http.get<Array<Company>>(this.apiRoute)
      .pipe(catchError(this.handleError<Array<Company>>('getCompanies', [])));
  }

  getCompany(id: number): Observable<Company> {
    return this.http.get<Company>(this.apiRoute + id)
      .pipe(catchError(this.handleError<Company>('getCompany')));
  }

  saveCompany(company: Company) {
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    if (company.id) {
      // update existing
      return this.http.put<Company>(this.apiRoute + company.id, JSON.stringify(company), options)
        .pipe(catchError(this.handleError<Company[]>('updateCompany', [])));
    }
    // create new
    return this.http.post<Company>(this.apiRoute, JSON.stringify(company), options)
      .pipe(catchError(this.handleError<Company[]>('createCompany', [])));
  }

  deleteCompany(id: number) {
    return this.http.delete<Company>(this.apiRoute + id.toString())
      .pipe(catchError(this.handleError<Company[]>('deleteCompany', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
