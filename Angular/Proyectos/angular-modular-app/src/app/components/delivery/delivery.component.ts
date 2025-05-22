import { Component, inject } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Delivery } from './models/delivery.model';
import { DeliveryItem } from './models/delivery-item.model';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  standalone: false,
  styleUrl: './delivery.component.css'
})

export class DeliveryComponent {

  private readonly _formBuilder = inject(FormBuilder);

  deliveries: Delivery[] = [];

  formGroup = this._formBuilder.group({
      deliveryDate: ['', Validators.required],
      customerName: ['', Validators.required],
      items: this._formBuilder.array([this.createItem()])
  });

  itemsFormArray: any;

  createItem(){
    return this._formBuilder.nonNullable.group({
      itemName: ['', Validators.required],
      quantity: ['', Validators.required, Validators.nullValidator, Validators.min(1)],
      price: ['', Validators.required, Validators.min(0.01)]
    });
  }

  addItem() {
    this.formGroup.controls.items.push(this.createItem());
  }

  removeItem(index: number) {
    this.formGroup.controls.items.removeAt(index);
  }

  get deliveryDateField() {
    return this.formGroup.controls.deliveryDate;
  }

  get customerNameField() {
    return this.formGroup.controls.customerName;
  }

  submitDelivery() {
    if (this.formGroup.valid) {

      // Obtener los datos del formulario
      const deliveryData = this.formGroup.value;

      // Crear un objeto Delivery con los datos del formulario
      const newDelivery: Delivery = {
        deliveryDate: deliveryData.deliveryDate ?? '',
        customerName: deliveryData.customerName ?? '',
        items: deliveryData.items?.map((item: any) => ({
          itemName: item.itemName ?? '',
          quantity: item.quantity ?? '',
          price: item.price ?? ''
        })) ?? []
      };

      console.log("newDelivery");
      console.log(newDelivery);

      this.deliveries.push(newDelivery);

      this.formGroup.reset();
    }
  }

}
