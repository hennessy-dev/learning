import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delivery-item',
  templateUrl: './delivery-item.component.html',
  standalone: false,
  styleUrl: './delivery-item.component.css'
})
export class DeliveryItemComponent {

  @Input() formGroup!: FormGroup;
  @Output() remove = new EventEmitter<void>();

  get itemNameField() {
    return this.formGroup.get('itemName');

  }

  get quantityField() {
    return this.formGroup.get('quantity');
  }

  get priceField() {
    return this.formGroup.get('price');
  }

}
