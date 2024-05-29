import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interface/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  favorites: Product[] = [];
  cart: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
    this.loadFavorites();
    this.loadCart();
  }

  addToFavorites(product: Product): void {
    if (!this.favorites.find(p => p.id === product.id)) {
      this.favorites.push(product);
      this.saveFavorites();
    }
  }

  addToCart(product: Product): void {
    if (!this.cart.find(p => p.id === product.id)) {
      this.cart.push(product);
      this.saveCart();
    }
  }

  private loadFavorites(): void {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      this.favorites = JSON.parse(savedFavorites);
    }
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
