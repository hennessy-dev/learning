import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interfaces/cart-item.interface';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order.interface';
import { Router } from '@angular/router';
import { LoginResponse } from '../../../user/interfaces/login-response.interface';
import { AuthService } from '../../../user/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-item-detail',
  templateUrl: './cart-item-detail.component.html',
  styleUrls: ['./cart-item-detail.component.css'],
})
export class CartItemDetailComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalAmount: number = 0;
  loginResponse: LoginResponse | null;
  

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.loginResponse = this.authService.getLoginResponse();
  }

  ngOnInit(): void {
    this.calculateTotal();
  }

  get itemsInCart() {
    return this.cartService.items();
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
    this.calculateTotal();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalAmount = 0;
    this.itemsInCart.forEach((item) => {
      this.cartService.findProductById(item.productId).subscribe({
        next: (product) => {
          this.totalAmount += item.quantity * product.price;
        },
        error: () => {
          this.showSnackBar('Error al obtener el producto.');
        },
      });
    });
  }

  placeOrder(): void {
    const order: Order = {
      customerId: this.loginResponse!.user.id,
      date: new Date().toISOString().split('T')[0],
      cartItems: this.itemsInCart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      total: this.totalAmount,
    };

    this.orderService.createOrder(order).subscribe({
      next: () => {
        this.showSnackBar('Pedido realizado con éxito');
        this.cartService.clearCart();
        this.router.navigate(['/orders']);
      },
      error: () => {
        this.showSnackBar('Error en el registro. Por favor, intenta de nuevo.');
      },
    });
  }


  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
