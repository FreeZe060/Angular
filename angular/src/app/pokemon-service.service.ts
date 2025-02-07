import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'http://localhost:8080/api/pokemons';  

  constructor(private http: HttpClient) {}

  getPokemons(name?: string, type?: string, sortBy?: string): Observable<Pokemon[]> {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    if (type) params = params.set('type', type);
    if (sortBy) params = params.set('sortBy', sortBy);

    return this.http.get<Pokemon[]>(`${this.apiUrl}`, { params });
  }

  // Si tu veux récupérer un Pokémon spécifique :
  getPokemonById(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
  }
}
