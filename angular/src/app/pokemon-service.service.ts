import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

    private favorites: string[] = [];  
    private favoritesSubject = new BehaviorSubject<string[]>([]);
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
        return this.http.get<any>('https://api.pokemontcg.io/v2/types').pipe(
            map(response => response.data)
        );
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
            this.favoritesSubject.next([...this.favorites]); 
            this.favoritesCountSubject.next(this.favorites.length);
        }
    }
    
    switchFavorite(pokemon: Pokemon) {
        if (typeof window === 'undefined') return;
        const index = this.favorites.indexOf(pokemon.id.toString());
        if (index !== -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(pokemon.id.toString());
        }

        this.favoritesSubject.next([...this.favorites]); 
        this.favoritesCountSubject.next(this.favorites.length);
        localStorage.setItem('pokemonFavs', JSON.stringify(this.favorites));
        this.favoritesSubject.next([...this.favorites]);
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 404) {
            return throwError(() => new Error("Ce Pokémon n'existe pas."));
        } else {
            return throwError(() => new Error("Une erreur est survenue."));
        }
    }

    private loadCartFromStorage() {
        if (typeof window !== 'undefined' && localStorage) {
            const storedCart = JSON.parse(localStorage.getItem('pokemonCart') || '[]');
            this.cart = storedCart;
            this.cartSubject.next(this.cart);
        }
    }

    clearCart() {
        localStorage.removeItem('pokemonCart');  
        this.cart = []; 
        this.cartSubject.next(this.cart); 
    }    

    isPokemonFavorite(pokemonId: string): boolean {
        if (typeof window === 'undefined') return false;
        const storedFavorites = JSON.parse(localStorage.getItem('pokemonFavs') || '[]');
        return storedFavorites.includes(pokemonId);
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

    removeFromCart(pokemonId: string) {
        this.cart = this.cart.filter(item => item.pokemon.id !== pokemonId); // Comparaison correcte
        this.updateCartStorage();
    }
    
    updateCartQuantity(pokemonId: string, quantity: number) {
        const existingItem = this.cart.find(item => item.pokemon.id === pokemonId);
        if (existingItem) {
            existingItem.quantity = quantity;
        }
        this.updateCartStorage();
    }

    updateCartStorage() {
        if (this.isBrowser) {
            localStorage.setItem('pokemonCart', JSON.stringify(this.cart));
        }
        this.cartSubject.next(this.cart);
    }

    getFavorites(pokemons: Pokemon[]): Pokemon[] {
        return pokemons.filter(pokemon => this.favorites.includes(pokemon.id.toString()));
    }

    getCart() {
        return this.cart;
    }

    getNumberOfCartItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }
}
