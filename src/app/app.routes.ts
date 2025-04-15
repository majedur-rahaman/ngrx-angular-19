import { Routes } from '@angular/router';
import { getProductsResolver } from './resolvers/get-products.resolver';

export const routes: Routes = [
    {
        path:'product',
        loadComponent: ()=> import('./product/product.component').then(c=>c.ProductComponent),
        resolve:{products:getProductsResolver},
        data:{title:'products'},
    },
    {
        path:"fav-product",
        loadComponent:()=> import('./fav-product/fav-product.component').then(c=>c.FavProductComponent),
        resolve:{products:getProductsResolver},
        data:{title:'products'},
    }
];
