import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import {IProduct} from "./products-list";
import {Observable, catchError, tap, throwError, map, delay, filter} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private readonly productUrl = "https://localhost:7116/api/Product";
  constructor(private https: HttpClient) { }

  getProducts(filter: string = ''): Observable<IProduct[]> {
    // return this.https.get<IProduct[]>(`${this.productUrl}?filter=${filter}`)
    return this.https.get<IProduct[]>(this.productUrl + "?=" + filter)
      .pipe(
        delay(1000),
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createProducts(product: IProduct): Observable<IProduct> {
    return this.https.post<IProduct>(this.productUrl, product);
  }

  getById(id: number): Observable<IProduct> {
    return this.https.get<IProduct>(this.productUrl + "/" + id);
  }

  updateProduct(id: number, product: IProduct) : Observable<IProduct> {
    return this.https.put<IProduct>(this.productUrl + "/" + id, product);
  }

  deleteProduct(id: number) : Observable<IProduct> {
    return this.https.delete<IProduct>(this.productUrl + "/" + id);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
