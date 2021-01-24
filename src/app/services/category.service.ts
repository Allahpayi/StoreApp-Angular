import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Category } from '../category/category';
import { Observable, throwError } from 'rxjs';
import { tap,catchError} from 'rxjs/operators'

@Injectable()
export class CategoryService {
  path = "http://localhost:3000/categories";
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http
    .get<Category[]>(this.path).pipe(
      tap(data=>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
  }
  addCategory(product: Category): Observable<Category> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": 'Token'
      })
    }
    return this.http.post<Category>(this.path, product, httpOptions).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = ''
    if (err.error instanceof ErrorEvent) {
      errorMessage = "Bir hata oluştu " +err.error.message
    }
    else{
      errorMessage = "Sistemsel bir hata."
    }
    return throwError(errorMessage);
  }
}
