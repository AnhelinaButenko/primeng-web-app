import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DailyForDayComponent} from "./daily-for-day.component";

const routes: Routes = [
  {
    path: '',
    component: DailyForDayComponent,
    children: [
      // { path: '', component: ProfilesComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyForDayModuleRoutingModule { }
