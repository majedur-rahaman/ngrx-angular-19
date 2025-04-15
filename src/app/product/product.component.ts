import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { map, Observable } from 'rxjs';
import { FavoriteProduct } from '../models/favorite-product.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { selectProducts } from '../states/selector/app.selector';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  displayedColumns: string[] = ['name', 'price', 'image', 'isFav'];
  favoriteProductsObs:Observable<Array<FavoriteProduct>>;
  data!: FavoriteProduct[];
  dataSource = new MatTableDataSource<FavoriteProduct>();

  constructor(private readonly activatedRoute: ActivatedRoute, 
    private readonly store:Store<AppState>, private readonly productService: ProductService){
      this.favoriteProductsObs  = this.store.pipe(select(selectProducts));
  }

  ngOnInit(){
    this.initResolvers();
    this.updateStorageToStateFavoriteProducts();
  }
  
  initResolvers(){
    this.activatedRoute.data.subscribe(({products})=>{
      this.initStateFavoriteProduct(products);
    })
  }
  initStateFavoriteProduct(products:Product[]){
    this.favoriteProductsObs.pipe(
      map((favoriteProducts) => this.mapProducts(products, favoriteProducts))
    )
    .subscribe((favotireProducts) => {
      debugger;
        this.data = favotireProducts;
        this.dataSource = new MatTableDataSource<FavoriteProduct>(this.data);
    })
  }
  
  private mapProducts(products:Product[], favotireProducts:FavoriteProduct[]):FavoriteProduct[] {
    return products.map((product) => {
      const favoriteFound = favotireProducts?.find((f) => f.id === product.id);
      return favoriteFound?{...product, isFavorite:true}:{...product, isFavorite:false}
    })
  }
  addProductToFavorites(product:Product){
    debugger;
    const favoriteProduct:FavoriteProduct = {
      ...product,
      isFavorite: true
    }
    this.productService.addProductToFav(favoriteProduct);
  }
  removeProductToFavorites(product:Product){
    const favoriteProduct:FavoriteProduct = {
      ...product,
      isFavorite: false
    }
    this.productService.removeProductToFavorites(favoriteProduct);
  }
  private updateStorageToStateFavoriteProducts(){
    this.productService.recoveryProductsToFavorites();
  }
}
