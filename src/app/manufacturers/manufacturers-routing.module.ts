import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ManufacturersComponent} from "./manufacturers.component";
import {ManufacturersListComponent} from "./manufacturers-list/manufacturers-list.component";
import {UpsertManufacturersComponent} from "./upsert-manufacturers/upsert-manufacturers.component";

const routes: Routes = [
  {
    path: '',
    component: ManufacturersComponent,
    children: [
      { path: 'list', component: ManufacturersListComponent},
      { path: 'manufacturer-create', component: UpsertManufacturersComponent},
      { path: 'manufacturer-update/:id', component: UpsertManufacturersComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufacturersRoutingModule { }
