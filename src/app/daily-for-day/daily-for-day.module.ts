import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {SelectButtonModule} from "primeng/selectbutton";
import {DailyForDayComponent} from "./daily-for-day.component";
import {DailyForDayModuleRoutingModule} from "./daily-for-day-routing.module";
import {AccordionModule} from "primeng/accordion";
import {DividerModule} from "primeng/divider";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";

@NgModule({
  declarations: [
    DailyForDayComponent
  ],
    imports: [
        CommonModule,
        DailyForDayModuleRoutingModule,
        ButtonModule,
        AutoCompleteModule,
        FormsModule,
        CheckboxModule,
        DropdownModule,
        InputNumberModule,
        SelectButtonModule,
        ReactiveFormsModule,
        AccordionModule,
        DividerModule,
        RippleModule,
        TableModule,
    ],
  providers: [

  ]
})
export class DailyForDayModule { }
