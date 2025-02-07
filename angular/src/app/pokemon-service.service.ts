import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
    private apiUrl = 'http://localhost:8080/api/pokemons';  

    // Ajout d'une condition pour vérifier si on est dans un environnement client (navigateur)
    private isBrowser: boolean = typeof window !== 'undefined';

    private favorites: number[] = this.isBrowser ? JSON.parse(localStorage.getItem('pokemonFavs') || '[]') : [];
    private cart: { pokemon: Pokemon, quantity: number }[] = this.isBrowser ? JSON.parse(localStorage.getItem('pokemonCart') || '[]') : [];

    private favoritesSubject = new BehaviorSubject<number[]>(this.favorites);
    favorites$ = this.favoritesSubject.asObservable();

    private cartSubject = new BehaviorSubject<{ pokemon: Pokemon, quantity: number }[]>(this.cart);
    cart$ = this.cartSubject.asObservable();

    constructor(private http: HttpClient) {}

    getPokemons(name?: string, type?: string, sortBy?: string): Observable<Pokemon[]> {
        let params = new HttpParams();
        if (name) params = params.set('name', name);
        if (type) params = params.set('type', type);
        if (sortBy) params = params.set('sortBy', sortBy);

        return this.http.get<Pokemon[]>(`${this.apiUrl}`, { params });
    }

    getPokemonById(id: string): Observable<Pokemon> {
        return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
    }

    switchFavorite(pokemonId: number) {
        if (this.favorites.includes(pokemonId)) {
            this.favorites = this.favorites.filter(id => id !== pokemonId);
        } else {
            this.favorites.push(pokemonId);
        }

        // Ne tenter de manipuler localStorage que si l'on est dans un environnement client
        if (this.isBrowser) {
            localStorage.setItem('pokemonFavs', JSON.stringify(this.favorites));
        }

        this.favoritesSubject.next(this.favorites);
    }

    getFavorites(): number[] {
        return this.favorites;
    }

    addToCart(pokemon: Pokemon, quantity: number = 1) {
        const existingItem = this.cart.find(item => item.pokemon.id === pokemon.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({ pokemon, quantity });
        }

        this.updateCartStorage();
    }

    removeFromCart(pokemonId: number) {
        this.cart = this.cart.filter(item => item.pokemon.id !== pokemonId.toString());
        this.updateCartStorage();
    }

    updateCartStorage() {
        // Ne tenter de manipuler localStorage que si l'on est dans un environnement client
        if (this.isBrowser) {
            localStorage.setItem('pokemonCart', JSON.stringify(this.cart));
        }
        this.cartSubject.next(this.cart);
    }

    getCart() {
        return this.cart;
    }

    getNumberOfCartItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }
}
