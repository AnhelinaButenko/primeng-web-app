import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DailyForDayComponent} from "./daily-for-day.component";
import {UpdateDailyForDayComponent} from "./update-daily-for-day/update-daily-for-day.component";
import {DailyForDayListComponent} from "./daily-for-day-list/daily-for-day-list.component";

const routes: Routes = [
  {
    path: '',
    component: DailyForDayComponent,
    children: [
      { path: 'list', component: DailyForDayListComponent},
      { path: 'updateMealProduct/:userId/:mealProductId', component: UpdateDailyForDayComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyForDayModuleRoutingModule { }
