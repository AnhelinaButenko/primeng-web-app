import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DailyForDayComponent} from "./daily-for-day.component";
import {UpsertDailyForDayComponent} from "./upsert-daily-for-day/upsert-daily-for-day.component";

const routes: Routes = [
  {
    path: '',
    component: DailyForDayComponent,
    children: [
      { path: 'updateMealProduct/:userId/:mealProductId/:productId', component: UpsertDailyForDayComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyForDayModuleRoutingModule { }
