import {Component, OnDestroy, OnInit} from '@angular/core';
import {DailyForDayService} from "../daily-for-day.service";
import {ProductConsumption} from "../daily-for-day";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-upsert-daily-for-day',
  templateUrl: './upsert-daily-for-day.component.html',
  styleUrls: ['./upsert-daily-for-day.component.scss']
})
export class UpsertDailyForDayComponent implements OnInit, OnDestroy {
  constructor(private dailyForDayService: DailyForDayService, private fb: FormBuilder,
              private route: ActivatedRoute, private router: Router,
              private messageService: MessageService,) { }

  productConsumption: ProductConsumption | undefined;
  sub: Subscription | undefined;
  getByIdSub: Subscription | undefined;
  updateSub: Subscription | undefined;
  deleteSub: Subscription | undefined;
  form: FormGroup | undefined = undefined;

  onSubmit(): void {
    console.log(JSON.stringify(this.form?.value));

    if (this.form?.value.id) {
      this.updateSub = this.dailyForDayService.updateMealProduct(this.form?.value.userId, this.form?.value.mealProductId, this.form?.value.productId).subscribe({
        next: meal => {
          console.log('Meal product updated successfully');
          this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'This product is updated' });
        }
      });
    // } else {
    //   this.sub = this.productsService.createProducts(this.form?.value).subscribe({
    //     next: product => {
    //       console.log(product);
    //       this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'This product is created' });
    //     }
    //   });
     }
  }

  ngOnInit(): void {

    const userId = Number(this.route.snapshot.paramMap.get('userId'));
    const mealProductId = Number(this.route.snapshot.paramMap.get('mealProductId'));
    const productId = Number(this.route.snapshot.paramMap.get('productId'));
    const date = this.route.snapshot.queryParamMap.get('date');

    this.form = this.fb.group({
      userId: [userId],
      mealProductId: [mealProductId],
      productId: [productId],
      gramsConsumed: [undefined, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.updateSub?.unsubscribe();
    this.getByIdSub?.unsubscribe();
    // this.deleteSub?.unsubscribe();
  }
}
