import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {IProduct} from "./products-list";
import {Observable, catchError, tap, throwError, map, delay, filter} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private readonly productUrl = "https://localhost:7116/api/Product";
  constructor(private https: HttpClient) { }

  getProducts(searchStr: string = '', filter: string = 'all'): Observable<IProduct[]> {
    const params = new HttpParams().set('searchStr', searchStr).set('filter', filter);
    return this.https.get<IProduct[]>(this.productUrl, {params: params})
  //   getProducts(): Observable<IProduct[]> {
  //     return this.https.get<IProduct[]>(this.productUrl)
      .pipe(
        delay(1000),
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // getProductsByManufacturer(manufacturerId: number): Observable<IProduct[]> {
  //   const params = new HttpParams().set('manufacturerId', manufacturerId.toString());
  //   return this.https.get<IProduct[]>(`${this.productUrl}/byManufacturer`, { params })
  //     .pipe(
  //       delay(1000),
  //       tap(data => console.log(`Products for Manufacturer ${manufacturerId}: `, JSON.stringify(data))),
  //       catchError(this.handleError)
  //     );
  // }

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
