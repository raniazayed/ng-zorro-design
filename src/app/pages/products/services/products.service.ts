import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/@Models/product.model';

@Injectable()
export class ProductsService {

  get Products(): IProduct[] {
    return products;
  }
}

const products = [
  {
    id: 1,
    name: {english:'Product 1', arabic:'المنتج الاول'},
    description: 'Product 1 description',
    quantity: 3,
    expire_date: '2020-12-1 09:55:22.607+00',
  },
  {
    id: 2,
    name:{english: 'Product 2', arabic:"المنتج الثانى"},
    description: 'Product 2 description',
    quantity: 13,
    expire_date: '2020-12-28 09:55:22.607+00',
  },
];