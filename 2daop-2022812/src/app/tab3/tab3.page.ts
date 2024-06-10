import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoritosService } from '../favoritos.service';
import { Subscription } from 'rxjs';
import { Item } from '../articulo.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {
  favoriteItems: Item[] = [];
  private subscription: Subscription | null = null;

  constructor(private favoritosService: FavoritosService, private navCtrl: NavController) {}

  ngOnInit() {
    this.loadFavorites();
    this.subscription = this.favoritosService.favoriteItems$.subscribe(items => {
      this.favoriteItems = items;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadFavorites() {
    this.favoriteItems = this.favoritosService.getFavoriteItems();
  }

  removeFromFavorites(item: Item) {
    this.favoritosService.removeFromFavorites(item);
  }

  
  openProductDetail(item: any) {
    this.navCtrl.navigateForward('/detalles', {
      queryParams: {
        item: JSON.stringify(item)
      }
    });
  }
}
