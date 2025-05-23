import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Order } from '../interfaces/order.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { OrderResponse } from '../interfaces/order-response.interface';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<Order> {
    const url = `${this.baseUrl}/orders`;
    return this.http.post<Order>(url, order);
  }

  getOrdersByCustomer(customerId: number): Observable<OrderResponse[]> {    
    const url = `${this.baseUrl}/ordersByCustomer/${customerId}`;
    return this.http.get<OrderResponse[]>(url);
  }
 
}
