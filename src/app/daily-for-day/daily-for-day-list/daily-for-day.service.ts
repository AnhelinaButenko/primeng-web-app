import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DailyForDayUserDto, ProductConsumption} from "./daily-for-day";
import {MealProductDto} from "./mealProductDto";

@Injectable({
  providedIn: 'root'
})
export class DailyForDayService {
  private dailyForDayUrl = "https://localhost:7116/api/DailyForDay";

  constructor(private https: HttpClient) { }
  getDailyForDayUser(userId: number, date: string): Observable<DailyForDayUserDto> {
    return this.https.get<DailyForDayUserDto>(`${this.dailyForDayUrl}/${userId}?date=${date}`);
  }

  deleteMealProduct(dailyForDayUserDto?: DailyForDayUserDto, prodConsuption?: ProductConsumption, date?: string) : Observable<any> {
    return this.https.delete<ProductConsumption>(`${this.dailyForDayUrl}/removeMealProduct/${dailyForDayUserDto?.userId}/${prodConsuption?.mealProductId}/${prodConsuption?.productId}?date=${date}`);
  }

  updateMealProduct(dailyForDayUserDto?: DailyForDayUserDto, prodConsuption?: ProductConsumption, updatedMealProduct?: MealProductDto, date?: string): Observable<any> {
    return this.https.put<DailyForDayUserDto>(`${this.dailyForDayUrl}/updateMealProduct/${dailyForDayUserDto?.userId}/${prodConsuption?.mealProductId}/${updatedMealProduct?.productId}?date=${date}`, updatedMealProduct);
  }
}
