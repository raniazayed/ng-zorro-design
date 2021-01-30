import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
