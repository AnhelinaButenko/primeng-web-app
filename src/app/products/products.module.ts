import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import {RouterOutlet} from "@angular/router";
import { ProductsComponent } from './products.component';
import {ProductsRoutingModule} from "./products-routing.module";
import {TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UpsertProductsComponent } from './upsert-products/upsert-products.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {MessagesModule} from "primeng/messages";
import {SkeletonModule} from "primeng/skeleton";

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
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    ToastModule,
    MessagesModule,
    SkeletonModule
  ], providers: [
    MessageService
  ]
})
export class ProductsModule { }
