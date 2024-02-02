import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, delay, Observable, tap, throwError} from "rxjs";
import {ICategory} from "./categories-list";

@Injectable({
  providedIn: 'root'
})
export class CategoriesListService {
  private categoryUrl = "https://localhost:7116/api/Category";

  constructor(private https: HttpClient) { }

  getCategories(searchStr: string = '', filter: string = 'all'): Observable<ICategory[]> {
    const params = new HttpParams().set('searchStr', searchStr).set('filter', filter);
    return this.https.get<ICategory[]>(this.categoryUrl, {params: params})
      .pipe(
        delay(1000),
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createCategories(category: ICategory): Observable<ICategory> {
    return this.https.post<ICategory>(this.categoryUrl, category);
  }

  getById(id: number): Observable<ICategory> {
    return this.https.get<ICategory>(this.categoryUrl + "/" + id);
  }

  updateCategory(id: number, category: ICategory) : Observable<ICategory> {
    return this.https.put<ICategory>(this.categoryUrl + "/" + id, category);
  }

  deleteCategory(id: number) : Observable<ICategory> {
    return this.https.delete<ICategory>(this.categoryUrl + "/" + id);
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
