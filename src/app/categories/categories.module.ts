import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {MessagesModule} from "primeng/messages";
import {SkeletonModule} from "primeng/skeleton";
import {PickListModule} from "primeng/picklist";
import {DragDropModule} from "primeng/dragdrop";
import {DropdownModule} from "primeng/dropdown";
import {TagModule} from "primeng/tag";
import {RatingModule} from "primeng/rating";
import {MessageService} from "primeng/api";
import {CategoriesRoutingModule} from "./categories-routing.module";
import {CategoriesListComponent} from "./categories-list/categories-list.component";
import {CategoriesComponent} from "./categories.component";
import {UpsertCategoriesComponent} from "./upsert-categories/upsert-categories.component";

@NgModule({
  declarations: [
    CategoriesListComponent,
    CategoriesComponent,
    UpsertCategoriesComponent
  ],
  imports: [
    CategoriesRoutingModule,
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
    TagModule,
    RatingModule,
  ], providers: [
    MessageService
  ]
})
export class CategoriesModule { }
