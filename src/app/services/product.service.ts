import { Injectable } from '@angular/core';
import { FavoriteProduct } from '../models/favorite-product.model';
import { StorageService } from './storage/storage.service';
import { AppState } from '../states/app.state';
import { Store } from '@ngrx/store';
import { add, clear, remove, updateAllState } from '../states/action/app.action';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import products from '../../mocks/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly storageService: StorageService<FavoriteProduct[]>,
    private readonly store: Store<AppState>
  ) { }
  addProductToFav(product: FavoriteProduct){
    const favoritesProducts = <FavoriteProduct[]>this.storageService.get('favoritesProduct');
    if(favoritesProducts){
      favoritesProducts.push(product);
      this.storageService.add('favoritesProduct', favoritesProducts);
    }else {
      this.storageService.add('favoritesProduct', [product]);
    }
    this.store.dispatch(add({product}));
  }
  getProducts(): Observable<Array<Product>> {
    return of(products)
  }
  getProductsToFavorites():FavoriteProduct[]{
    const products = <FavoriteProduct[]>this.storageService.get('favoritesProduct');
    return products;
  }
  clearProductsToFavorites(){
    this.storageService.remove('favoritesProduct');
    this.store.dispatch(clear());
  }
  removeProductToFavorites(product:FavoriteProduct):boolean{
    const favoritesProducts = <FavoriteProduct[]>this.storageService.get('favoritesProduct');

    if(favoritesProducts){
      const newfavoritesProducts = favoritesProducts.filter((p) => p.id !== product.id);
      this.storageService.add('favoritesProduct', newfavoritesProducts);
      this.store.dispatch(remove({product}));
      return true;
    }
    return false;
  }
  recoveryProductsToFavorites():void{
    const products = <FavoriteProduct[]>this.storageService.get('favoritesProduct');
  
    if(products){
      this.store.dispatch(updateAllState({products}));
    }
  }
}
