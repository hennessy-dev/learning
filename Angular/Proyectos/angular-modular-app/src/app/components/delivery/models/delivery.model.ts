import { DeliveryItem } from "./delivery-item.model";

export interface Delivery {
    deliveryDate: string;
    customerName: string;
    items: DeliveryItem[];
  }