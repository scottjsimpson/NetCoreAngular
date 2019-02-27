import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const options = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }) };

    var formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.apiRoute, formData)
      .pipe(catchError(this.handleError<Form>('uploadFile')))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
