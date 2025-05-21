import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CardDetailComponent } from './card/card-detail/card-detail.component';
import { TransfertAccountComponent } from './transfert-account/transfert-account.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'card', component: CardComponent },
  { path: 'card/:id', component: CardDetailComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: 'form-reactive', loadChildren: () => import('./form-reactive/form-reactive.module').then(m => m.FormReactiveModule) },
  { path: 'transfer-account', component: TransfertAccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
