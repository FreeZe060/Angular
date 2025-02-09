import { Component, OnInit, Input, inject } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';

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
                    (ngModelChange)="onSearchInputChange()"
                    class="px-4 py-2 rounded-full text-black"
                    placeholder="Rechercher par nom"
                />
                </div>

                <div class="mt-4 flex flex-wrap justify-center gap-4">
                     <select [(ngModel)]="selectedType" (ngModelChange)="applyFilters()" class="px-4 py-2 rounded-full text-black">
                        <option value="">Tous types</option>
                        <option>
                            @for(type of types; track type) {
                                {{ type }}
                            }
                        </option>
                    </select>
                    <select [(ngModel)]="selectedRarity" (ngModelChange)="applyFilters()" class="px-4 py-2 rounded-full text-black">
                        <option value="">Toutes les raretés</option>
                        <option>
                            @for(rarity of allRarities; track rarity) {
                                {{ rarity }}
                            }
                        </option>
                    </select>

                    <select [(ngModel)]="sortBy" (ngModelChange)="applyFilters()" class="px-4 py-2 rounded-full text-black">
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
  favorites: string[] = [];
  searchName = '';
  selectedType = '';
  selectedRarity = '';
  sortBy = 'name_asc';
  allRarities: string[] = [];
  showFavorites = false;
  
  private searchTerms = new Subject<string>();
  private activatedRoute = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);
  types: any;

  ngOnInit() {
      this.pokemonService.getPokemons().subscribe((data) => {
          if (data && Array.isArray(data)) {
              this.pokemons = data;
              this.applyFilters();
          } else {
              console.error('Données invalides reçues', data);
          }
      });

      this.pokemonService.getTypes().subscribe((types) => {
          this.types = types;
      });

      this.activatedRoute.url.subscribe((urlSegments) => {
          this.showFavorites = urlSegments.some(segment => segment.path === 'favoris');
          this.applyFilters();
      });

      this.pokemonService.favorites$.subscribe(favorites => {
          this.favorites = favorites;
          this.applyFilters();
      });

      this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(() => {
          this.applyFilters();
      });
  }

  onSearchInputChange() {
    this.searchTerms.next(this.searchName);
  }

  applyFilters() {
      if (!this.pokemons.length) return;

      this.filteredPokemons = [...this.pokemons];

      if (this.showFavorites) {
        this.filteredPokemons = this.filteredPokemons.filter(pokemon =>
            this.pokemonService.isPokemonFavorite(pokemon.id)
        );
      }

      // ✅ Appliquer le filtre de recherche
      if (this.searchName) {
          this.filteredPokemons = this.filteredPokemons.filter(pokemon =>
              pokemon.name.toLowerCase().includes(this.searchName.toLowerCase())
          );
      }
  }

  toggleFavorite(pokemon: Pokemon) {
      this.pokemonService.switchFavorite(pokemon);
  }

  trackByFn(index: number, item: Pokemon) {
      return item.id;
  }
}


// export class ProductsListComponent implements OnInit {
//   pokemons: Pokemon[] = [];
//   filteredPokemons: Pokemon[] = [];
//   searchName = '';
//   selectedType = '';
//   selectedRarity = '';
//   sortBy = 'name_asc';
//   showFavorites = false;
  
//   private searchTerms = new Subject<string>();
//   private activatedRoute = inject(ActivatedRoute);
//   private pokemonService = inject(PokemonService);
//   types: any;
// allRarities: any;

//   ngOnInit() {
//       this.pokemonService.getPokemons().subscribe((data) => {
//           if (data && Array.isArray(data)) {
//               this.pokemons = data;
//               this.applyFilters();
//           } else {
//               console.error('Données invalides reçues', data);
//           }
//       });

//       this.pokemonService.getTypes().subscribe((types) => {
//           this.types = types;
//       });

//       this.activatedRoute.url.subscribe((urlSegments) => {
//           this.showFavorites = urlSegments.some(segment => segment.path === 'favoris');
//           this.applyFilters();
//       });

//       this.searchTerms.pipe(
//         debounceTime(300),
//         distinctUntilChanged()
//       ).subscribe(() => {
//           this.applyFilters();
//       });
//   }

//   onSearchInputChange() {
//     this.searchTerms.next(this.searchName);
//   }

//   applyFilters() {
//       if (!this.pokemons.length) return;

//       this.filteredPokemons = [...this.pokemons];

//       if (this.showFavorites) {
//           this.filteredPokemons = this.filteredPokemons.filter(pokemon =>
//               this.pokemonService.isPokemonFavorite(pokemon.id)
//           );
//       }

//       if (this.searchName) {
//           this.filteredPokemons = this.filteredPokemons.filter(pokemon =>
//               pokemon.name.toLowerCase().includes(this.searchName.toLowerCase())
//           );
//       }
//   }

//   toggleFavorite(pokemon: Pokemon) {
//       this.pokemonService.switchFavorite(pokemon);
//   }

//   trackByFn(index: number, item: Pokemon) {
//       return item.id;
//   }
// }

