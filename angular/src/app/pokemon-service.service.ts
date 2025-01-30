import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Pokemon } from './pokemon';

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    private apiUrl = 'http://localhost:8080/api/pokemons';

    constructor(private http: HttpClient) { }

    getPokemons(name?: string, type?: string, sortBy?: string): Observable<Pokemon[]> {
        let params = new HttpParams();
        if (name) params = params.set('name', name);
        if (type) params = params.set('type', type);
        if (sortBy) params = params.set('sortBy', sortBy);
    
        return this.http.get<Pokemon[]>(`${this.apiUrl}`, { params }).pipe(
            tap(data => console.log('Liste des Pokémons:', data)),
            catchError(this.handleError)
        );
    }

    getPokemonById(id: string): Observable<Pokemon> {
        return this.http.get<Pokemon>(`${this.apiUrl}/${id}`).pipe(
            tap(data => console.log(`Détails du Pokémon ${id}:`, data)),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        console.error('Erreur API:', error);
        return throwError(() => new Error('Une erreur est survenue, veuillez réessayer plus tard.'));
    }
}
