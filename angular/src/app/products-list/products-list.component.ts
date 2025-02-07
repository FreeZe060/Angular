import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../pokemon-service.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { Pokemon } from '../pokemon';
import { SortByName} from '../sort-by-name.pipe';
import { SortByPrice } from '../sort-by-price.pipe';
import { SortByHp } from '../sort-by-hp.pipe';
import { SortByRarity } from '../sort-by-rarity.pipe';
import { SortByType } from '../sort-by-type.pipe';

@Component({
    imports: [PokemonCardComponent, FormsModule, SortByName, SortByPrice, SortByHp, SortByRarity, SortByType],
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
                        <option>
                            @for(type of types; track type) {
                                {{ type }}
                            }
                        </option>
                    </select>
                    <select [(ngModel)]="selectedRarity" (ngModelChange)="updateFilters()" class="px-4 py-2 rounded-full text-black">
                        <option value="">Toutes les raretés</option>
                        <option>
                            @for(rarity of allRarities; track rarity) {
                                {{ rarity }}
                            }
                        </option>
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
                @for (pokemon of filteredPokemons | sortByRarity:selectedRarity | sortByType:selectedType | sortByName:sortBy | sortByHp:sortBy | sortByPrice:sortBy; track trackByFn) {
                    <app-pokemon-card [pokemon]="pokemon"></app-pokemon-card>
                }
            </div>
        </div>
    `,
    styles: ``,
    providers: []
})
export class ProductsListComponent implements OnInit {
    @Input() pokemon: any;
    pokemons: Pokemon[] = [];
    filteredPokemons: Pokemon[] = [];
    favorites: Pokemon[] = [];
    types: string[] = [];
    searchName = '';
    selectedType = '';
    selectedRarity = '';
    sortBy = 'name_asc';
    allRarities: string[] = [];
  
    private searchTerms = new Subject<{ name: string; type: string; sortBy: string }>();
  
    constructor(private pokemonService: PokemonService) {}
  
    ngOnInit() {
        this.searchTerms.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap(({ name, type, sortBy }) => this.pokemonService.getPokemons(name, type, sortBy))
        ).subscribe((data) => {
          if (data && Array.isArray(data)) {
            this.pokemons = data;
            this.filteredPokemons = [...this.pokemons];
      
            this.allRarities = [...new Set(data.map(pokemon => pokemon.rarity))];
          } else {
            console.error('Données invalides reçues', data);
          }
        });
      
        this.pokemonService.getTypes().subscribe((types) => {
          this.types = types;
        });
      
        this.updateFilters();
    }

    updateFilters() {
      console.log('SortBy: ', this.sortBy); 
      this.searchTerms.next({
        name: this.searchName,
        type: this.selectedType,
        sortBy: this.sortBy,
      });
    }
  
    onSortChange(newSortBy: string) {
      this.sortBy = newSortBy;
      console.log('SortBy mis à jour:', this.sortBy); 
      this.updateFilters();
    }
  
    toggleFavorite(pokemon: Pokemon) {
      const index = this.favorites.indexOf(pokemon);
      if (index === -1) {
        this.favorites.push(pokemon);
      } else {
        this.favorites.splice(index, 1);
      }
    }
  
    trackByFn(index: number, item: Pokemon) {
      return item.id; 
    }
}