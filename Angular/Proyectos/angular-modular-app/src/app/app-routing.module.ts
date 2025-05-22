import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './components/card/card.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CardDetailComponent } from './components/card/card-detail/card-detail.component';
import { TransfertAccountComponent } from './components/transfert-account/transfert-account.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { MyComponentComponent } from './components/my-component/my-component.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CounterComponent } from './components/counter/counter.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'card', component: CardComponent },
  { path: 'card/:id', component: CardDetailComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'customer', loadChildren: () => import('./components/customer/customer.module').then(m => m.CustomerModule) },
  { path: 'form-reactive', loadChildren: () => import('./components/form-reactive/form-reactive.module').then(m => m.FormReactiveModule) },
  { path: 'transfer-account', component: TransfertAccountComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'directivas', component: MyComponentComponent },
  { path: 'task-list', component: TaskListComponent },
  { path: 'counter', component: CounterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
