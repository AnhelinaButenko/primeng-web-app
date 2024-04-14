import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {DailyForDayUserDto} from "./daily-for-day";

@Injectable({
  providedIn: 'root'
})
export class DailyForDayService {
  private profileUrl = "https://localhost:7116/api/DailyForDay";

  constructor(private https: HttpClient) { }
  getDailyForDayUser(userId: number, date: string): Observable<DailyForDayUserDto> {
    return this.https.get<DailyForDayUserDto>(this.profileUrl + "/" + userId + "?date=" + date);
  }
}
