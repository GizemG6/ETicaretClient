import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { OrdersComponent } from './orders/orders.component';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeModule } from 'src/app/ui/components/home/home.module';
import { BasketsModule } from 'src/app/ui/components/baskets/baskets.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    HomeModule,
    BasketsModule
  ]
})
export class ComponentsModule { }
