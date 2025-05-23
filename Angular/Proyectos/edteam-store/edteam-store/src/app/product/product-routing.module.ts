import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCatalogComponent } from './components/product-catalog/product-catalog.component';
import { CartItemDetailComponent } from './components/cart-item-detail/cart-item-detail.component';
import { OrderListComponent } from './components/order-list/order-list.component';

const routes: Routes = [
  { path: 'catalog', component: ProductCatalogComponent },
  { path: 'cart', component: CartItemDetailComponent },
  { path: 'order-list', component: OrderListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
