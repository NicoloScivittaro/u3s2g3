import { Component } from '@angular/core';
import { Product } from '../../interface/product';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  favorites: Product[] = [];

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      this.favorites = JSON.parse(savedFavorites) as Product[];
    }
  }
}
