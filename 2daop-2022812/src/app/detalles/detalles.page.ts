import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  product: any;
  selectedSize: string = '';
  selectedColor: string ='';
  discountedPrice!: number;

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private toastCtrl: ToastController, private cartService: CartService) {
    
    this.route.queryParams.subscribe(params => {
      if (params && params['item']) {
        this.product = JSON.parse(params['item']);
        this.discountedPrice = this.product.price * 0.5;
      }
    });
  }

  ngOnInit() {}

  async addToCart() {
    this.cartService.addToCart(this.product);
    const toast = await this.toastCtrl.create({
      message: 'Articulo añadido correctamente al carrito',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    toast.present();
  }
}
