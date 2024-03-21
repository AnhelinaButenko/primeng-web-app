import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IProfile} from "./profiles";

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  private profileUrl = "https://localhost:7116/api/User";

  constructor(private https: HttpClient) { }

  getById(id: number): Observable<IProfile> {
    return this.https.get<IProfile>(this.profileUrl + "/" + id).pipe(
      map((profile: IProfile) => {
        profile.activityLevel = parseInt(profile.activityLevel.toString());
        profile.gender = parseInt(profile.gender.toString());
        return profile;
      })
    );
  }

  updateProfile(id: number, profile: IProfile) : Observable<IProfile> {
    return this.https.put<IProfile>(this.profileUrl + "/" + id, profile);
  }
}
