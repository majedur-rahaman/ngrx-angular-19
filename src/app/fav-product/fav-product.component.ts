import { Component } from '@angular/core';
import { FavoriteProduct } from '../models/favorite-product.model';
import { Product } from '../models/product.model';
import { map, Observable, of } from 'rxjs';
import { AppState } from '../states/app.state';
import { select, Store } from '@ngrx/store';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { selectProducts } from '../states/selector/app.selector';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-fav-product',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './fav-product.component.html',
  styleUrl: './fav-product.component.css'
})
export class FavProductComponent {
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
      debugger;
      this.favoriteProductsObs.pipe(
        map((favoriteProducts) => this.mapProducts(products, favoriteProducts))
      )
      .subscribe((favotireProducts) => {
        debugger;
          this.data = favotireProducts;//.filter(f=>f.isFavorite==true);
          this.dataSource = new MatTableDataSource<FavoriteProduct>(this.data);
      })
    }
    
    private mapProducts(products:Product[], favotireProducts:FavoriteProduct[]):FavoriteProduct[] {
      debugger;
      return products.map((product) => {
        debugger;
        const favoriteFound = favotireProducts?.find((f) => f.id === product.id);
        return favoriteFound?{...product, isFavorite:true}:{...product, isFavorite:false}
      })
    }
    private updateStorageToStateFavoriteProducts(){
      this.productService.recoveryProductsToFavorites();
    }
}
