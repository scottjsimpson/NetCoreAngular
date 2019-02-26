import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  apiRoute: string = '/api/fileuploads/'

  constructor(private http: HttpClient) { }

  saveImage(file) {
    debugger
    return this.http.post<Form>(this.apiRoute, file)
      .pipe(catchError(this.handleError<Form>('uploadFile')))
      .subscribe(response => {
        console.log(response);
      },
      error => { console.log(error) });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
