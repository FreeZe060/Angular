import { Component, OnInit, Input, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../pokemon-service.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { Pokemon } from '../pokemon';
import { SortByName } from '../sort-by-name.pipe';
import { SortByPrice } from '../sort-by-price.pipe';
import { SortByHp } from '../sort-by-hp.pipe';
import { SortByType } from '../sort-by-type.pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
	imports: [PokemonCardComponent, FormsModule, SortByName, SortByPrice, SortByHp, SortByType],
	selector: 'app-pokemons-list',
	template: `
		<div class="px-5 py-8 bg-gray-100 min-h-screen">

            <div class="px-5 flex gap-16 items-center justify-center bg-white shadow-xl rounded-lg p-4">
                <div class="flex items-center bg-gray-100 p-2 rounded-lg">
                    <input
                    type="text"
                    [(ngModel)]="searchName"
                    (ngModelChange)="applyFilters()"
					class="outline-none bg-transparent px-4 text-gray-700"
                    placeholder="Chercher par Nom..."
                	/>
                    <button class="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        Chercher
                    </button>
                </div>

                <h2 class="text-xl font-semibold text-center text-gray-800">{{favorites.length}} Favoris</h2>

                <div>
                    <label class="text-gray-600 font-medium">Filtrer par</label>
                    <select [(ngModel)]="sortBy" (ngModelChange)="applyFilters()" class="ml-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-red-500">
                        <option value="name_asc">A-Z</option>
                        <option value="name_desc">Z-A</option>
                        <option value="price_asc">Prix Bas</option>
                        <option value="price_desc">Prix Haut</option>
                        <option value="hp_asc">HP Bas</option>
                        <option value="hp_desc">HP Haut</option>
                    </select>
                </div>
                <div>
                    <label class="text-gray-600 font-medium">Filtrer par Types</label>
                    <select [(ngModel)]="selectedType" (ngModelChange)="applyFilters()" class="ml-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-red-500">
                        <option value="">Tous types</option>
						@for(type of types; track type) {
							<option [value]="type">{{ type }}</option>
						}
                    </select>
                </div>

            </div>

			<div class="flex justify-center items-center pt-20 gap-12 flex-wrap">
				@for (pokemon of filteredPokemons | sortByType:selectedType | sortByName:sortBy | sortByHp:sortBy | sortByPrice:sortBy; track trackByFn) {
					<app-pokemon-card [pokemon]="pokemon"></app-pokemon-card>
				}
			</div>

    	</div>
    `,
	styles: ``,
	providers: []
})
export class PokemonsListComponent implements OnInit {
	@Input() pokemon: any;
	pokemons: Pokemon[] = [];
	filteredPokemons: Pokemon[] = [];
	favorites: string[] = [];
	types: string[] = [];
	searchName = '';
	selectedType = '';
	selectedRarity = '';
	sortBy = 'name_asc';
	allRarities: string[] = [];
	showFavorites = false;

	private searchTerms = new Subject<string>();
	private activatedRoute = inject(ActivatedRoute);

	constructor(private pokemonService: PokemonService) { }

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

		if (this.searchName) {
			this.filteredPokemons = this.filteredPokemons.filter(pokemon =>
				pokemon.name.toLowerCase().includes(this.searchName.toLowerCase())
			);
		}

		if (this.selectedType) {
			this.filteredPokemons = this.filteredPokemons.filter(pokemon =>
				pokemon.types && pokemon.types.includes(this.selectedType)
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