import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, delay, Observable, tap, throwError} from "rxjs";
import {IManufacturer} from "./manufacturers-list";

@Injectable({
  providedIn: 'root'
})
export class ManufacturersListService {
  private manufacturerUrl = "https://localhost:7116/api/Manufacturer";
  constructor(private https: HttpClient) { }

  getManufacturers(): Observable<IManufacturer[]> {
    return this.https.get<IManufacturer[]>(this.manufacturerUrl)
      .pipe(
        delay(1000),
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createManufacturers(manufacturer: IManufacturer): Observable<IManufacturer> {
    return this.https.post<IManufacturer>(this.manufacturerUrl, manufacturer);
  }

  getById(id: number): Observable<IManufacturer> {
    return this.https.get<IManufacturer>(this.manufacturerUrl + "/" + id);
  }

  updateManufacturer(id: number, manufacturer: IManufacturer) : Observable<IManufacturer> {
    return this.https.put<IManufacturer>(this.manufacturerUrl + "/" + id, manufacturer);
  }

  deleteManufacturer(id: number) : Observable<IManufacturer> {
    return this.https.delete<IManufacturer>(this.manufacturerUrl + "/" + id);
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
