import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../pokemon-service.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonSortPipe } from '../pokemon-sort.pipe';
import { Pokemon } from '../pokemon';
import { PokemonTypeFilter } from '../pokemonTypeFilter.pipe';
import { PokemonSearchFilterPipe } from '../pokemonSearchFilter.pipe';

@Component({
    imports: [PokemonCardComponent, FormsModule, PokemonSortPipe, PokemonTypeFilter, PokemonSearchFilterPipe],
    selector: 'app-products-list',
    template: `
       <div class="container mx-auto p-4">
            <div class="text-center mb-6">
                <h1 class="text-4xl font-bold text-white">Pokémon List</h1>

                <div class="mt-4">
                <input
                    type="text"
                    [(ngModel)]="searchName"
                    (ngModelChange)="updateFilters()"
                    class="px-4 py-2 rounded-full text-black"
                    placeholder="Rechercher par nom"
                />
                </div>

                <div class="mt-4 flex flex-wrap justify-center gap-4">
                    <select [(ngModel)]="selectedType" (ngModelChange)="updateFilters()" class="px-4 py-2 rounded-full text-black">
                        <option value="">Tous types</option>
                        <option value="fire">Feu</option>
                        <option value="water">Eau</option>
                        <option value="grass">Plante</option>
                    </select>

                    <select [(ngModel)]="sortBy" (ngModelChange)="updateFilters()" class="px-4 py-2 rounded-full text-black">
                        <option value="name_asc">A-Z</option>
                        <option value="name_desc">Z-A</option>
                        <option value="price_asc">Prix Bas</option>
                        <option value="price_desc">Prix Haut</option>
                        <option value="hp_asc">HP Bas</option>
                        <option value="hp_desc">HP Haut</option>
                    </select>
                </div>
            </div>

            <div class="flex flex-wrap items-center gap-12">
                @for (pokemon of pokemons | pokemonSearchFilter:searchName:selectedType | pokemonSort:sortBy; track pokemon) {
                    <app-pokemon-card [pokemon]="pokemon"></app-pokemon-card>
                }
            </div>
        </div>
    `,
    styles: ``,
    providers: []
})
export class ProductsListComponent implements OnInit {
    pokemons: Pokemon[] = [];
    searchName = '';
    selectedType = '';
    sortBy = 'name_asc';
    favorites: Pokemon[] = [];  // Gérer les favoris avec cette variable
  
    private searchTerms = new Subject<{ name: string; type: string; sortBy: string }>();
  
    constructor(private pokemonService: PokemonService) {}
  
    ngOnInit() {
      this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(({ name, type, sortBy }) => this.pokemonService.getPokemons(name, type, sortBy))
      ).subscribe((data) => {
        this.pokemons = data;
      });
  
      this.updateFilters();
    }
  
    updateFilters() {
      this.searchTerms.next({
        name: this.searchName,
        type: this.selectedType,
        sortBy: this.sortBy,
      });
    }
  
    toggleFavorite(pokemon: Pokemon) {
      // Ajoute ou retire des favoris
      const index = this.favorites.indexOf(pokemon);
      if (index === -1) {
        this.favorites.push(pokemon);
      } else {
        this.favorites.splice(index, 1);
      }
    }
}