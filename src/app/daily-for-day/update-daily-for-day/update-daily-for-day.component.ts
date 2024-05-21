import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {DailyForDayService} from "../daily-for-day-list/daily-for-day.service";
import {MealProductDto, MealProductSummaryRequestDto} from "../daily-for-day-list/mealProductDto";
import {DailyForDayUserDto, ProductConsumption} from "../daily-for-day-list/daily-for-day";
import {FormControl} from "@angular/forms";

// send GET request to api/dailyforday/getmealproductsummary
// body { userId, mealproductid, date}

@Component({
  selector: 'app-update-daily-for-day',
  templateUrl: './update-daily-for-day.component.html',
  styleUrls: ['./update-daily-for-day.component.scss']
})
export class UpdateDailyForDayComponent implements OnInit, OnDestroy {
  constructor(private dailyForDayService: DailyForDayService,
              private route: ActivatedRoute, private router: Router,
              private messageService: MessageService) { }

  getSub: Subscription | undefined;
  mealProductSummaryRequestDto: MealProductSummaryRequestDto | undefined;
  mealProductDto: MealProductDto | undefined;
  productName: string | undefined;
  public date: string = '2024-04-13';

  gramsConsumedControl: FormControl = new FormControl({ value: undefined, disabled: false });

  onSubmit(): void {

    this.getSub = this.dailyForDayService.getMealProductSummary(this.mealProductSummaryRequestDto).subscribe({
      next: (mealProductDto: MealProductDto | undefined) => {
        this.mealProductDto = mealProductDto;
        console.log('Meal product got successfully:', mealProductDto);
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'This product is get' });

        this.productName = mealProductDto?.productName;

        this.gramsConsumedControl.patchValue(mealProductDto?.productWeightGr);
      },
      error: err => {
        console.error('Error getting meal product:', err);
        this.messageService.add({ severity: 'error', summary: 'Service Message', detail: 'Failed to get product' });
      }
    });
  }

  onUpdate(): void {
    if (this.mealProductDto) {

      this.mealProductDto.productWeightGr = this.gramsConsumedControl.value;

      this.dailyForDayService.updateMealProduct(this.mealProductSummaryRequestDto?.userId, this.mealProductDto, this.date).subscribe({
        next: (updatedMealProduct: MealProductDto) => {
          console.log('Meal product updated successfully:', updatedMealProduct);
          this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'This product is updated' });
        },
        error: err => {
          console.error('Error updating meal product:', err);
          this.messageService.add({ severity: 'error', summary: 'Service Message', detail: 'Failed to update product' });
        }
      });
    } else {
      console.error('Meal product is not got yet');
      this.messageService.add({ severity: 'error', summary: 'Service Message', detail: 'Please choose the product' });
    }
  }

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('userId'));
    const mealProductId = Number(this.route.snapshot.paramMap.get('mealProductId'));
    const productId = Number(this.route.snapshot.paramMap.get('productId'));
    const dateTime = this.route.snapshot.queryParamMap.get('date');

    this.mealProductSummaryRequestDto = {
      userId : userId,
      dateTime : dateTime,
      mealProductId : mealProductId
    }

    // this.mealProductSummaryRequestDto = {
    //   userId,
    //   dateTime,
    //   mealProductId
    // }

    this.onSubmit();
  }

  ngOnDestroy(): void {
    this.getSub?.unsubscribe();
  }
}
