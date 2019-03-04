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

  saveCompanyImage(file, companyId, imageId) {
    var formData = new FormData();
    formData.append('file', file);
    if (companyId) {
      formData.append('companyId', companyId);
    }
    if (imageId) {
      formData.append('imageId', imageId);
    }

    return this.saveImage(formData);
  }

  saveRecruiterImage(file, recruiterId, imageId) {
    var formData = new FormData();
    formData.append('file', file);
    if (recruiterId) {
      formData.append('recruiterId', recruiterId);
    }
    if (imageId) {
      formData.append('imageId', imageId);
    }

    return this.saveImage(formData);
  }

  private saveImage(formData) {
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
