import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FavoritosService } from '../favoritos.service';
import { ToastController } from '@ionic/angular';
import { Item } from '../articulo.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  segment: string = 'all';
  items = [
    { name: 'Aqua Blue Dress', price: 212.99, type: 'dress', image: 'assets/img/image1.jpg', rating: 5.0 },
    { name: 'Sky Blue Dress', price: 212.99, type: 'dress', image: 'assets/img/image2.jpg', rating: 5.0 },
    { name: 'Modern Black Dress', price: 212.99, type: 'dress', image: 'assets/img/image3.jpg', rating: 5.0 },
    { name: 'Modern White Dress', price: 212.99, type: 'dress', image: 'assets/img/image4.jpg', rating: 5.0 },
    { name: 'Stylish Hat', price: 49.99, rating: 4.5, type: 'hat', image: 'assets/img/image5.jpg' },
    { name: 'Elegant Watch', price: 99.99, rating: 4.8, type: 'watch', image: 'assets/img/image6.jpg' },
    { name: 'Leather Watch', price: 109.99, rating: 4.6, type: 'watch', image: 'assets/img/image7.jpg' },
    { name: 'Houston Cowboy Hat', price: 99.99, rating: 5.0, type: 'hat', image: 'assets/img/image8.jpg' },
    { name: 'Caribbean Hat', price: 39.99, rating: 4.7, type: 'hat', image: 'assets/img/image9.jpg' },
    { name: 'Classic Wrist Watch', price: 29.99, rating: 4.2, type: 'watch', image: 'assets/img/image10.jpg' },
    { name: 'Round Watch', price: 59.99, rating: 4.7, type: 'watch', image: 'assets/img/image11.jpg' },
    { name: 'Lana Bucket Hat', price: 69.99, rating: 5.0, type: 'hat', image: 'assets/img/image12.jpg' },
    
  ];
  searchTerm = '';
  filteredItems = [...this.items];

  constructor(private navCtrl: NavController, private favoritosService: FavoritosService, private toastController: ToastController) {}

  ngOnInit() {
    this.filterItems();
  }

  openProductDetail(item: any) {
    this.navCtrl.navigateForward('/detalles', {
      queryParams: {
        item: JSON.stringify(item)
      }
    });
  }

  filterItems(event?: any) {
    if (event && event.target) {
      this.searchTerm = event.target.value.toLowerCase();
    }

    let filtered = this.items;

    if (this.segment !== 'all') {
      filtered = filtered.filter(item => item.type === this.segment);
    }

    if (this.searchTerm) {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(this.searchTerm));
    }

    this.filteredItems = filtered;
  }

  async addToFavorites(item: Item) {
    this.favoritosService.addToFavorites(item);
    const toast = await this.toastController.create({
      message: 'Producto agregado a favoritos exitosamente',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

}
