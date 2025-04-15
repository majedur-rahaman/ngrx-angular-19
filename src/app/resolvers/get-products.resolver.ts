import { ResolveFn } from '@angular/router';
import { Product } from '../models/product.model';
import { inject } from '@angular/core';
import { ProductService } from '../services/product.service';

export const getProductsResolver: ResolveFn<Array<Product>> = (route, state) => {
  return inject(ProductService).getProducts();
};