import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {IProfile} from "./profiles";

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  private profileUrl = "https://localhost:7116/api/User";

  constructor(private https: HttpClient) { }

  getById(id: number): Observable<IProfile> {
    return this.https.get<IProfile>(this.profileUrl + "/" + id);
  }

  updateProfile(id: number, profile: IProfile) : Observable<IProfile> {
    return this.https.put<IProfile>(this.profileUrl + "/" + id, profile);
  }

  // private handleError(err: HttpErrorResponse): Observable<never> {
  //   let errorMessage = '';
  //   if (err.error instanceof ErrorEvent) {
  //     errorMessage = `An error occurred: ${err.error.message}`;
  //   } else {
  //     errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  //   }
  //   console.error(errorMessage);
  //   return throwError(() => errorMessage);
  // }
}
