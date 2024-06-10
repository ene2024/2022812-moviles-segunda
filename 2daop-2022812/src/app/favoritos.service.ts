import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from './articulo.model'

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private favoriteItems: Item[] = [];
  private favoriteItemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);

  favoriteItems$ = this.favoriteItemsSubject.asObservable();

  constructor() { }

  getFavoriteItems(): Item[] {
    return this.favoriteItems;
  }

  addToFavorites(item: Item): void {
    const index = this.favoriteItems.findIndex(i => i.name === item.name);
    if (index === -1) {
      this.favoriteItems.push(item);
      this.favoriteItemsSubject.next(this.favoriteItems);
    }
  }

  removeFromFavorites(item: Item): void {
    const index = this.favoriteItems.findIndex(i => i.name === item.name);
    if (index > -1) {
      this.favoriteItems.splice(index, 1);
      this.favoriteItemsSubject.next(this.favoriteItems);
    }
  }
}
