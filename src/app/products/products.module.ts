import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import {RouterOutlet} from "@angular/router";
import { ProductsComponent } from './products.component';
import {ProductsRoutingModule} from "./products-routing.module";
import {TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UpsertProductsComponent } from './upsert-products/upsert-products.component';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsComponent,
    UpsertProductsComponent
  ],
  imports: [
    ProductsRoutingModule,
    CommonModule,
    RouterOutlet,
    TableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
