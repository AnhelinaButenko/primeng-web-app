import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {DailyForDayModule} from "./daily-for-day/daily-for-day.module";

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    { path: 'products',
      loadChildren: () => import('./products/products.module').then((m: any) => m.ProductsModule) },
    { path: 'manufacturers',
      loadChildren: () => import('./manufacturers/manufacturers.module').then((m: any) => m.ManufacturersModule) },
    {
      path: 'categories',
      loadChildren: () => import('./categories/categories.module').then((m: any) => m.CategoriesModule) },
    {
      path: 'profile',
      loadChildren: () => import('./profiles/profiles.module').then((m: any) => m.ProfilesModule) },
    {
      path: 'daily-for-day',
      loadChildren: () => import('./daily-for-day/daily-for-day.module').then((m: any) => m.DailyForDayModule) },
  ]
}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
