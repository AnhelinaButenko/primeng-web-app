import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {DailyForDayService} from "./daily-for-day.service";
import {DailyForDayUserDto, DailyMeal} from "./daily-for-day";

@Component({
  selector: 'app-daily-for-day',
  templateUrl: './daily-for-day.component.html',
  styleUrls: ['./daily-for-day.component.scss']
})
export class DailyForDayComponent implements OnInit{
  constructor(private dailyForDayService: DailyForDayService) { }

  caloriesLeft: number | undefined;
  caloriesConsumed: number | undefined;
  proteinsConsumed: number | undefined;
  fatsConsumed: number | undefined;
  carbohydratesConsumed: number | undefined;
  proteinsPercentage: number | undefined;
  fatsPercentage: number | undefined;
  carbohydratesPercentage: number | undefined;
  dailyMealsForUser: DailyMeal[] = [];


  onSubmit(): void {
    this.dailyForDayService.getDailyForDayUser(1, '2024-04-13').subscribe(
      data  => {
        this.caloriesLeft = data.caloriesLeft || 0;
        this.caloriesConsumed = data.caloriesConsumed || 0;
        this.proteinsConsumed = data.proteinsConsumed || 0;
        this.fatsConsumed = data.fatsConsumed || 0;
        this.carbohydratesConsumed = data.carbohydratesConsumed || 0;

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

  addProduct(item: any) {

  }
}
