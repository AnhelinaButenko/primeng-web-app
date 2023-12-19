import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManufacturersListComponent } from './manufacturers-list/manufacturers-list.component';
import { UpsertManufacturersComponent } from './upsert-manufacturers/upsert-manufacturers.component';
import {ManufacturersComponent} from "./manufacturers.component";
import {RouterOutlet} from "@angular/router";
import {TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {MessagesModule} from "primeng/messages";
import {SkeletonModule} from "primeng/skeleton";
import {MessageService} from "primeng/api";
import {ManufacturersRoutingModule} from "./manufacturers-routing.module";
import {PickListModule} from "primeng/picklist";
import {DragDropModule} from "primeng/dragdrop";
import {DropdownModule} from "primeng/dropdown";

@NgModule({
  declarations: [
    ManufacturersListComponent,
    ManufacturersComponent,
    UpsertManufacturersComponent
  ],
  imports: [
    ManufacturersRoutingModule,
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
    SkeletonModule,
    PickListModule,
    DragDropModule,
    DropdownModule,
  ], providers: [
    MessageService
  ]
})
export class ManufacturersModule { }
