import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductResponse } from '../../interfaces/product-response.interface';
import { Category } from '../../interfaces/category';
import { CartService } from '../../services/cart.service';
import { ProductRequest } from '../../interfaces/product-request.interface';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css'],
})
export class ProductCatalogComponent {
  products: ProductResponse[] = [];
  filteredProducts: ProductResponse[] = [];
  categories: Category[] = [];

  selectedCategory: number | null = null;
  cartItemCount = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  get countInCart() {
    return this.cartService.cartItemCount();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
     next: (data)=>{
        this.products = data;
        this.filteredProducts = data; 
     },
     error: (err)=>{
      console.error('Error fetching products', err);
     }
   });
  }


 
  loadCategories(): void {
    this.productService.getCategories().subscribe({
     next: (data)=>{        
        this.categories = data;
     },
     error: (err)=>{
      console.error('Error fetching categories', err);
     }
    });
  }


  filterByCategory(): void {
    if (this.selectedCategory) {
      this.filteredProducts = this.products.filter(
        (product) => product.categoryId === this.selectedCategory
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  addToCart(product: ProductRequest): void {
    this.cartService.addToCart(product);
  }
}
