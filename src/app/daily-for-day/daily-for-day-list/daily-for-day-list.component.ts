import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {DailyForDayUserDto, DailyMeal, ProductConsumption} from "./daily-for-day";
import {DailyForDayService} from "./daily-for-day.service";

@Component({
  selector: 'app-daily-for-day-list',
  templateUrl: './daily-for-day-list.component.html',
  styleUrls: ['./daily-for-day-list.component.scss']
})

export class DailyForDayListComponent implements OnInit, OnDestroy{
  constructor(private dailyForDayService: DailyForDayService, private messageService: MessageService, private router: Router) { }

  caloriesLeft: number | undefined;
  caloriesConsumed: number | undefined;
  proteinsConsumed: number | undefined;
  fatsConsumed: number | undefined;
  carbohydratesConsumed: number | undefined;
  proteinsPercentage: number | undefined;
  fatsPercentage: number | undefined;
  carbohydratesPercentage: number | undefined;

  dailyMealsForUser: DailyMeal[] = [];
  dailyForDayUserDto: DailyForDayUserDto | undefined;
  errorMessage = '';
  sub!: Subscription;
  deleteSub!: Subscription;
  updateSub!: Subscription;
  mealProductId: number | undefined;

  private readonly userId: number = 1;
  public date: string = '2024-04-13';

  onSubmit(): void {
    this.dailyForDayService.getDailyForDayUser(this.userId, this.date).subscribe(
      data  => {
        this.caloriesLeft = data.caloriesLeft || 0;
        this.caloriesConsumed = data.caloriesConsumed || 0;
        this.proteinsConsumed = data.proteinsConsumed || 0;
        this.fatsConsumed = data.fatsConsumed || 0;
        this.carbohydratesConsumed = data.carbohydratesConsumed || 0;
        this.dailyForDayUserDto = data;
        this.mealProductId = data.mealProductId || 0;

        this.proteinsPercentage = ((this.proteinsConsumed + this.fatsConsumed + this.carbohydratesConsumed) / this.proteinsConsumed) * 100;
        this.fatsPercentage = (this.fatsConsumed / (this.proteinsConsumed + this.fatsConsumed + this.carbohydratesConsumed)) * 100;
        this.carbohydratesPercentage = (this.carbohydratesConsumed / (this.proteinsConsumed + this.fatsConsumed + this.carbohydratesConsumed)) * 100;

        this.dailyMealsForUser = data.dailyMeals || [];
      },
      error => {
        console.error(error);
      }
    );
  }

  ngOnInit(): void {
    this.onSubmit();
  }

  onDeleteMealProduct(dailyForDayUserDto: DailyForDayUserDto | undefined, prodConsuption: ProductConsumption): void  {
    this.deleteSub = this.dailyForDayService.deleteMealProduct(dailyForDayUserDto, prodConsuption, this.date).subscribe(
      response => {
        console.log('Meal product deleted successfully');
        this.onSubmit();
      },
      error => {
        console.error('Error deleting meal product:', error);
        this.errorMessage = 'Error deleting meal product';
      }
    );
  }

  onCreate(): void {

  }

  onUpdate(userId?: number, mealProductId?: number, productId?: number): void {
    this.router.navigate([`/daily-for-day/updateMealProduct/${userId}/${mealProductId}/${productId}`], { queryParams: { date: this.date } });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
