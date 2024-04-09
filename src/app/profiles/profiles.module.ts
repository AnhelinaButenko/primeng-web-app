import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfilesComponent} from "./profiles.component";
import {ProfilesRoutingModule} from "./profiles-routing.module";
import {ButtonModule} from "primeng/button";
import {MessageService} from "primeng/api";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {SelectButtonModule} from "primeng/selectbutton";



@NgModule({
  declarations: [
    ProfilesComponent,
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    ButtonModule,
    AutoCompleteModule,
    FormsModule,
    CheckboxModule,
    DropdownModule,
    InputNumberModule,
    SelectButtonModule,
    ReactiveFormsModule,
  ],
  providers: [
    MessageService
  ]
})
export class ProfilesModule { }
