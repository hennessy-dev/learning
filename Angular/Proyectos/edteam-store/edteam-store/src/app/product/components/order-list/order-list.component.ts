import { Component, inject } from '@angular/core';
import { Order } from '../../interfaces/order.interface';
import { OrderService } from '../../services/order.service';
import { LoginResponse } from '../../../user/interfaces/login-response.interface';
import { AuthService } from '../../../user/services/auth.service';
import { OrderResponse } from '../../interfaces/order-response.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css',
})
export class OrderListComponent {
  orders: OrderResponse[] = [];  
  private authService = inject(AuthService);

  loginResponse: LoginResponse | null;
  
  constructor(
    private ordersService: OrderService,
    private snackBar: MatSnackBar
  ) {
    this.loginResponse = this.authService.getLoginResponse();
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.ordersService
      .getOrdersByCustomer(this.loginResponse!.user.id)
      .subscribe({
        next: (orders) => {
          this.orders = orders;
        },
        error: () => {
          this.showSnackBar('Error fetching orders');
        },
      });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
