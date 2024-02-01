import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CategoriesComponent} from "./categories.component";
import {UpsertCategoriesComponent} from "./upsert-categories/upsert-categories.component";
import {CategoriesListComponent} from "./categories-list/categories-list.component";

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    children: [
      { path: 'list', component: CategoriesListComponent},
      { path: 'categories-create', component: UpsertCategoriesComponent},
      { path: 'categories-update/:id', component: UpsertCategoriesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
