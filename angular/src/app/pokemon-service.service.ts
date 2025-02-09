import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
    private apiUrl = 'http://localhost:8080/api/pokemons';  

    private isBrowser: boolean = typeof window !== 'undefined';

    private pokemons: Pokemon[] = [];
    private pokemonsSubject = new BehaviorSubject<Pokemon[]>([]);
    pokemons$ = this.pokemonsSubject.asObservable();

    private pokemonsCountSubject = new BehaviorSubject<number>(0);
    pokemonsCount$ = this.pokemonsCountSubject.asObservable();

    private favorites: number[] = [];
    private favoritesSubject = new BehaviorSubject<number[]>([]);
    favorites$ = this.favoritesSubject.asObservable();

    private favoritesCountSubject = new BehaviorSubject<number>(0);
    favoritesCount$ = this.favoritesCountSubject.asObservable();

    private cart: { pokemon: Pokemon, quantity: number }[] = [];
    private cartSubject = new BehaviorSubject<{ pokemon: Pokemon, quantity: number }[]>([]);
    cart$ = this.cartSubject.asObservable();

    constructor(private http: HttpClient) { 
        this.loadFavoritesFromStorage();
        this.loadCartFromStorage();
    }

    getPokemons(name?: string, type?: string, sortBy?: string): Observable<Pokemon[]> {
        let params = new HttpParams();
        if (name) params = params.set('name', name);
        if (type) params = params.set('type', type);
        if (sortBy) params = params.set('sortBy', sortBy);

        return this.http.get<Pokemon[]>(`${this.apiUrl}`, { params }).pipe(
            tap(pokemons => {
                this.pokemons = pokemons;
                this.pokemonsSubject.next(this.pokemons);
                this.pokemonsCountSubject.next(pokemons.length);
            })
        );
    }

    getTypes(): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/types`);
    }

    getNumberOfPokemons(): number {
        return this.pokemons.length;
    }

    getPokemonById(id: string): Observable<Pokemon> {
        return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
    }

    private loadFavoritesFromStorage() {
        if (typeof window !== 'undefined' && localStorage) {
            this.favorites = JSON.parse(localStorage.getItem('pokemonFavs') || '[]');
            this.favoritesSubject.next(this.favorites);
            this.favoritesCountSubject.next(this.favorites.length);
        }
    }

    switchFavorite(pokemon: Pokemon) {}

    // switchFavorite(pokemon: Pokemon) {
    //     if (pokemon.isFavorite) {
    //         this.favorites = this.favorites.filter(id => id !== pokemon.id);
    //     } else {
    //         this.favorites.push(pokemon.id);
    //     }
        
    //     pokemon.isFavorite = !pokemon.isFavorite;
    //     this.pokemonsSubject.next(this.pokemons);
    //     this.favoritesSubject.next(this.favorites);
    //     this.favoritesCountSubject.next(this.favorites.length);

    //     if (typeof window !== 'undefined' && localStorage) {
    //         localStorage.setItem('pokemonFavs', JSON.stringify(this.favorites));
    //     }
    // }

    private loadCartFromStorage() {
        if (typeof window !== 'undefined' && localStorage) {
            const storedCart = JSON.parse(localStorage.getItem('pokemonCart') || '[]');
            this.cart = storedCart;
            this.cartSubject.next(this.cart);
        }
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
