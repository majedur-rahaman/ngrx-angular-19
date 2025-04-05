import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'product',
        loadComponent: ()=> import('./product/product.component').then(c=>c.ProductComponent),
    },
    {
        path:"fav-product",
        loadComponent:()=> import('./fav-product/fav-product.component').then(c=>c.FavProductComponent)
    }
];
