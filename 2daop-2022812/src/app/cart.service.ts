import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {}

  getCartItems() {
    return this.cartItems;
  }

  addToCart(item: { name: any; }) {
    const index = this.cartItems.findIndex(i => i.name === item.name);
    if (index > -1) {
      this.cartItems[index].quantity += 1;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
  }

  increaseQuantity(item: { name: any; }) {
    const index = this.cartItems.findIndex(i => i.name === item.name);
    if (index > -1) {
      this.cartItems[index].quantity += 1;
    }
  }

  decreaseQuantity(item: { name: any; }) {
    const index = this.cartItems.findIndex(i => i.name === item.name);
    if (index > -1) {
      this.cartItems[index].quantity -= 1;
      if (this.cartItems[index].quantity === 0) {
        this.cartItems.splice(index, 1);
      }
    }
  }

  clearCart() {
    this.cartItems = [];
  }
}
