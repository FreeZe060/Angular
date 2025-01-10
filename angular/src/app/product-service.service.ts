import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
    providedIn: 'root',
})

export class ProductService {
    private products = [
        <Product>{ id: 0, name: 'Harry Potter', isFavorite: false, createdDate: new Date(1980, 6, 31) },
        <Product>{ id: 1, name: 'Ronnald Weasley', isFavorite: false, createdDate: new Date(1980, 3, 1) },
        <Product>{ id: 2, name: 'Hermione Granger', isFavorite: false, createdDate: new Date(1979, 8, 19) },
        <Product>{ id: 3, name: 'Neville Londubas', isFavorite: false, createdDate: new Date(1980, 7, 30) },
        <Product>{ id: 4, name: 'Albus Dumbledore', isFavorite: false, createdDate: new Date(1881, 7, 30) },
        <Product>{ id: 5, name: 'Severus Snape', isFavorite: false, createdDate: new Date(1960, 1, 9) },
        <Product>{ id: 6, name: 'Draco Malfoy', isFavorite: false, createdDate: new Date(1980, 5, 5) },
        <Product>{ id: 7, name: 'Luna Lovegood', isFavorite: false, createdDate: new Date(1981, 2, 13) },
        <Product>{ id: 8, name: 'Ginny Weasley', isFavorite: false, createdDate: new Date(1981, 7, 11) },
        <Product>{ id: 9, name: 'Fred Weasley', isFavorite: false, createdDate: new Date(1978, 3, 1) },
        <Product>{ id: 10, name: 'George Weasley', isFavorite: false, createdDate: new Date(1978, 3, 1) },
        <Product>{ id: 11, name: 'Minerva McGonagall', isFavorite: false, createdDate: new Date(1935, 9, 4) },
        <Product>{ id: 12, name: 'Hagrid', isFavorite: false, createdDate: new Date(1928, 11, 6) },
        <Product>{ id: 13, name: 'Sirius Black', isFavorite: false, createdDate: new Date(1960, 10, 11) },
        <Product>{ id: 14, name: 'Remus Lupin', isFavorite: false, createdDate: new Date(1960, 2, 10) }
    ];

    constructor() { }

    getProducts() {
        return this.products;
    }

    getProductById(id: number) {
        return this.products[id];
    }

    removeProduct(id: number) {
        this.products = this.products.filter((product) => product.id !== id);
    }

    switchFav(product: Product) {
        product.isFavorite = !product.isFavorite;
    }
}
