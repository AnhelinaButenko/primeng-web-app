import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProfilesComponent} from "./profiles.component";
import {ProfilesListComponent} from "./profiles-list/profiles-list.component";

const routes: Routes = [
  {
    path: '',
    component: ProfilesComponent,
    children: [
      { path: 'list', component: ProfilesListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
