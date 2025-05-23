import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductCatalogComponent } from './components/product-catalog/product-catalog.component';
import { MaterialModule } from '../material/material.module';
import { CartItemDetailComponent } from './components/cart-item-detail/cart-item-detail.component';
import { FormsModule } from '@angular/forms';
import { OrderListComponent } from './components/order-list/order-list.component';


@NgModule({
  declarations: [    
    ProductCatalogComponent,
    CartItemDetailComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class ProductModule { }
