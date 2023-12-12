import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsListComponent} from "./products-list/products-list.component";
import {ProductsComponent} from "./products.component";
import {UpsertProductsComponent} from "./upsert-products/upsert-products.component";

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      { path: 'list', component: ProductsListComponent},
      { path: 'product-create', component: UpsertProductsComponent},
      { path: 'product-update/:id', component: UpsertProductsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
