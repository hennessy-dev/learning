import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CardDetailComponent } from './components/card/card-detail/card-detail.component';
import { CalculatorModule } from './components/calculator/calculator.module';
import { MaterialComponentsModule } from './components/material-components/material-components.module';
import { TransfertAccountComponent } from './components/transfert-account/transfert-account.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { DeliveryItemComponent } from './components/delivery/delivery-item/delivery-item.component';
import { MyComponentComponent } from './components/my-component/my-component.component';
import { PasswordStrengthDirective } from './password-strength.directive';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CounterComponent } from './components/counter/counter.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MyInterceptor } from './interceptors/my-interceptor.interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    CardDetailComponent,
    TransfertAccountComponent,
    DeliveryComponent,
    DeliveryItemComponent,
    MyComponentComponent,
    PasswordStrengthDirective,
    TaskListComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalculatorModule,
    FormsModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {



}
