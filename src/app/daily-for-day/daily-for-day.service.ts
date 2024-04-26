import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DailyForDayUserDto, ProductConsumption} from "./daily-for-day";

@Injectable({
  providedIn: 'root'
})
export class DailyForDayService {
  private dailyForDayUrl = "https://localhost:7116/api/DailyForDay";

  constructor(private https: HttpClient) { }
  getDailyForDayUser(userId: number, date: string): Observable<DailyForDayUserDto> {
    return this.https.get<DailyForDayUserDto>(`${this.dailyForDayUrl}/${userId}?date=${date}`);
  }

  deleteBreakfastProduct(dailyForDayUserDto: DailyForDayUserDto, prodConsuption: ProductConsumption, date: string) : Observable<any> {
    return this.https.delete<ProductConsumption>(`${this.dailyForDayUrl}/removeBreakfastProduct/${dailyForDayUserDto.userId}/${dailyForDayUserDto.breakfastProductId}/${prodConsuption.productId}?date=${date}`);
  }

  deleteLunchProduct(dailyForDayUserDto: DailyForDayUserDto, prodConsuption: ProductConsumption, date: string) : Observable<any> {
    return this.https.delete<ProductConsumption>(`${this.dailyForDayUrl}/removeLunchProduct/${dailyForDayUserDto.userId}/${dailyForDayUserDto.lunchProductId}/${prodConsuption.productId}?date=${date}`);
  }

  deleteDinnerProduct(dailyForDayUserDto: DailyForDayUserDto, prodConsuption: ProductConsumption, date: string) : Observable<any> {
      return this.https.delete<ProductConsumption>(`${this.dailyForDayUrl}/removeDinnerProduct/${dailyForDayUserDto.userId}/${dailyForDayUserDto.dinnerProductId}/${prodConsuption.productId}?date=${date}`);
    }
}
