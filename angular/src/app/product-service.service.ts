import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, Rarity } from './product';

@Injectable({
    providedIn: 'root',
})

export class ProductService {
    private products = [
        { id: 1, name: 'Harry Potter', isFavorite: false, createdDate: new Date(1980, 6, 31), rarity: Rarity.Legendary, price: 99, img: '/media/harry.jpg' },
        { id: 2, name: 'Ronnald Weasley', isFavorite: false, createdDate: new Date(1980, 3, 1), rarity: Rarity.Epic, price: 49, img: '/media/ronald.jpg' },
        { id: 3, name: 'Hermione Granger', isFavorite: false, createdDate: new Date(1979, 8, 19), rarity: Rarity.Epic, price: 49, img: '/media/hermione.jpg' },
        { id: 4, name: 'Neville Londubas', isFavorite: false, createdDate: new Date(1980, 7, 30), rarity: Rarity.Uncommon, price: 19, img: '/media/londubas.jpg' },
        { id: 5, name: 'Albus Dumbledore', isFavorite: false, createdDate: new Date(1881, 7, 30), rarity: Rarity.Legendary, price: 89, img: '/media/albus.jpg' },
        { id: 6, name: 'Severus Snape', isFavorite: false, createdDate: new Date(1960, 1, 9), rarity: Rarity.Common, price: 19, img: '/media/severus.jpg' },
        { id: 7, name: 'Draco Malfoy', isFavorite: false, createdDate: new Date(1980, 5, 5), rarity: Rarity.Epic, price: 59, img: '/media/drago.jpg' },
        { id: 8, name: 'Luna Lovegood', isFavorite: false, createdDate: new Date(1981, 2, 13), rarity: Rarity.Uncommon, price: 24.99, img: '/media/luna.jpg' },
        { id: 9, name: 'Ginny Weasley', isFavorite: false, createdDate: new Date(1981, 7, 11), rarity: Rarity.Common, price: 29.99, img: '/media/ginny.jpg' },
        { id: 10, name: 'Fred Weasley', isFavorite: false, createdDate: new Date(1978, 3, 1), rarity: Rarity.Rare, price: 39.99, img: '/media/fred.jpg' },
        { id: 11, name: 'George Weasley', isFavorite: false, createdDate: new Date(1978, 3, 1), rarity: Rarity.Common, price: 29.99, img: '/media/george.jpg' },
        { id: 12, name: 'Minerva McGonagall', isFavorite: false, createdDate: new Date(1935, 9, 4), rarity: Rarity.Rare, price: 39.99, img: '/media/minerva.jpg' },
        { id: 13, name: 'Hagrid', isFavorite: false, createdDate: new Date(1928, 11, 6), rarity: Rarity.Epic, price: 59.99, img: '/media/hagrid.jpg' },
        { id: 14, name: 'Sirius Black', isFavorite: false, createdDate: new Date(1960, 10, 11), rarity: Rarity.Common, price: 19.99, img: '/media/sirius.jpg' },
        { id: 15, name: 'Remus Lupin', isFavorite: false, createdDate: new Date(1960, 2, 10), rarity: Rarity.Common, price: 9.99, img: '/media/lupin.jpg' },
    ] as Product[];

    private productsSubject = new BehaviorSubject<Product[]>(this.products);
    products$ = this.productsSubject.asObservable();

    constructor() { }

    getProducts() {
        return this.products;
    }

    getProduct(id: number) {
        return this.products.find((product) => product.id === id);
    }

    getNumberOfProducts() {
        return this.products.length;
    }

    getNumberOfFavorites() {
        return this.products.filter((product) => product.isFavorite).length;
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
