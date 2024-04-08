import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfilesComponent} from "./profiles.component";
import {ProfilesRoutingModule} from "./profiles-routing.module";
import { ProfilesListComponent } from './profiles-list/profiles-list.component';
import {ButtonModule} from "primeng/button";



@NgModule({
  declarations: [
    ProfilesComponent,
    ProfilesListComponent,
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    ButtonModule,
  ]
})
export class ProfilesModule { }
