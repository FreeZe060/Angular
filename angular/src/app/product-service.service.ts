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
        { id: 6, name: 'Severus Snape', isFavorite: false, createdDate: new Date(1960, 1, 9), rarity: Rarity.Rare, price: 39.99, img: '/media/severus.jpg' },
        { id: 7, name: 'Draco Malfoy', isFavorite: false, createdDate: new Date(1980, 5, 5), rarity: Rarity.Epic, price: 59, img: '/media/drago.jpg' },
        { id: 8, name: 'Luna Lovegood', isFavorite: false, createdDate: new Date(1981, 2, 13), rarity: Rarity.Uncommon, price: 24.99, img: '/media/luna.jpg' },
        { id: 9, name: 'Ginny Weasley', isFavorite: false, createdDate: new Date(1981, 7, 11), rarity: Rarity.Common, price: 29.99, img: '/media/ginny.jpg' },
        { id: 10, name: 'Fred Weasley', isFavorite: false, createdDate: new Date(1978, 3, 1), rarity: Rarity.Rare, price: 39.99, img: '/media/fred.jpg' },
        { id: 11, name: 'George Weasley', isFavorite: false, createdDate: new Date(1978, 3, 1), rarity: Rarity.Uncommon, price: 29.99, img: '/media/george.jpg' },
        { id: 12, name: 'Minerva McGonagall', isFavorite: false, createdDate: new Date(1935, 9, 4), rarity: Rarity.Rare, price: 39.99, img: '/media/minerva.jpg' },
        { id: 13, name: 'Hagrid', isFavorite: false, createdDate: new Date(1928, 11, 6), rarity: Rarity.Epic, price: 59.99, img: '/media/hagrid.jpg' },
        { id: 14, name: 'Sirius Black', isFavorite: false, createdDate: new Date(1960, 10, 11), rarity: Rarity.Common, price: 19.99, img: '/media/sirius.jpg' },
        { id: 15, name: 'Remus Lupin', isFavorite: false, createdDate: new Date(1960, 2, 10), rarity: Rarity.Common, price: 9.99, img: '/media/lupin.jpg' },
    ] as Product[];

    private productsSubject = new BehaviorSubject<Product[]>(this.products);
    products$ = this.productsSubject.asObservable();

    private favoritesCountSubject = new BehaviorSubject<number>(0);
    favoritesCount$ = this.favoritesCountSubject.asObservable();

    private cart: { product: Product, quantity: number }[] = [];
    private cartSubject = new BehaviorSubject<{ product: Product, quantity: number }[]>([]);
    cart$ = this.cartSubject.asObservable();

    constructor() { 
        this.initializeFavoritesFromStorage();
        this.initializeCartFromStorage();
        this.updateFavoritesCount();
    }

    private initializeFavoritesFromStorage() {
        if (typeof window !== 'undefined' && localStorage) {
            const storedFavorites = JSON.parse(localStorage.getItem('fav') || '[]');
            if (storedFavorites) {
                this.products = this.products.map((product) => {
                    const favorite = storedFavorites.find((id: number) => id === product.id);
                    return favorite ? { ...product, isFavorite: favorite } : product;
                });
                this.productsSubject.next(this.products);
            }
        }
    }

    private initializeCartFromStorage() {
        if (typeof window !== 'undefined' && localStorage) {
            const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            if (storedCart.length > 0) {
                this.cart = storedCart.map((item: any) => ({
                    product: this.products.find(p => p.id === item.id)!,
                    quantity: item.quantity,
                }));
                this.cartSubject.next(this.cart);
            }
        }
    }

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

    private updateFavoritesCount() {
        const count = this.products.filter((product) => product.isFavorite).length;
        this.favoritesCountSubject.next(count);
    }

    switchFav(product: Product) {
        product.isFavorite = !product.isFavorite;
        localStorage.setItem('fav', JSON.stringify(this.products.filter((product) => product.isFavorite).map((product) => product.id)));
        this.updateFavoritesCount(); 
    }

    addToCart(product: Product, quantity: number = 1) {
        const existingItem = this.cart.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity = quantity;  
        } else {
            this.cart.push({ product, quantity });
        }
        this.updateCartStorage();
    }
      
    removeFromCart(productId: number) {
        this.cart = this.cart.filter(item => item.product.id !== productId);
        this.updateCartStorage();
    }
      
    updateCartStorage() {
        const cartData = this.cart.map(item => ({
          id: item.product.id,
          quantity: item.quantity,
        }));
        localStorage.setItem('cart', JSON.stringify(cartData));
        this.cartSubject.next(this.cart);
    }
      

    getCart() {
        return this.cart;
    }

    getNumberOfCartItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }
}
