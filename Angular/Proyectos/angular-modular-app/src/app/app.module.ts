import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CardDetailComponent } from './card/card-detail/card-detail.component';
import { CalculatorModule } from './calculator/calculator.module';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { TransfertAccountComponent } from './transfert-account/transfert-account.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DeliveryItemComponent } from './delivery/delivery-item/delivery-item.component';
import { MyComponentComponent } from './my-component/my-component.component';
import { PasswordStrengthDirective } from './password-strength.directive';

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
    PasswordStrengthDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalculatorModule,
    FormsModule,
    MaterialComponentsModule,
    ReactiveFormsModule
  ],
  providers: [
    // provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }