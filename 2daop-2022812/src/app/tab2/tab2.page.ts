import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  cartItems: any[] = [];
  totalItems: number = 0;
  total: number = 0;
  shippingFee: number = 0; 
  subtotal: number = 0;
  selectedPaymentMethod: string = '';
  paymentMethods: string[] = ['VISA', 'MasterCard', 'PayPal'];

  constructor(private cartService: CartService, private toastCtrl: ToastController) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalItems = this.cartItems.reduce((a, b) => a + b.quantity, 0);
    this.total = this.cartItems.reduce((a, b) => a + (b.price * b.quantity), 0);
    this.subtotal = this.total + this.shippingFee; // Adjust according to your shipping fee logic
  }

  increaseQuantity(item: any) {
    this.cartService.increaseQuantity(item);
    this.calculateTotal();
  }

  decreaseQuantity(item: any) {
    this.cartService.decreaseQuantity(item);
    this.calculateTotal();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }

  async pay() {
    const toast = await this.toastCtrl.create({
      message: 'Pago Realizado con éxito',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    toast.present();
    this.clearCart();
  }
}
