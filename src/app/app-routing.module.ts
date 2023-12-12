import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    { path: 'products',
      loadChildren: () => import('./products/products.module').then((m: any) => m.ProductsModule) }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
