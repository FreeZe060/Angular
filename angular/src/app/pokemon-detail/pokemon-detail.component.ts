import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonService } from '../pokemon-service.service';
import { DatePipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-pokemon-detail',
	imports: [DatePipe, CommonModule, RouterLink],
	template: `
    <div class="pokemon-detail min-h-screen bg-gradient-to-br from-green-300 via-yellow-300 to-orange-400 flex flex-col items-center py-10">
		<div class="card-container">
			<div class="card w-full sm:w-[60rem] rounded-xl overflow-hidden shadow-lg">
				<div class="relative bg-gradient-to-br p-3 rounded-xl flex items-start gap-8">
					<!-- Pokemon Image -->
					<div class="pokemon-image-container w-1/3 h-[300px] mb-4 rounded-lg overflow-hidden">
						<img class="pokemon-image w-full h-full object-cover" [src]="pokemon.images.large" alt="Image de {{ pokemon.name }}">
					</div>


					<!-- Pokemon Details -->
					<div class="pokemon-info bg-white/90 backdrop-blur rounded-lg p-4 w-2/3 space-y-4">
						<h2 class="text-3xl font-bold text-center text-indigo-900">{{ pokemon.name | titlecase }}</h2>

						<div class="pokemon-types flex justify-center gap-3">
							<span *ngFor="let type of pokemon?.types" class="pokemon-type text-xs text-white px-2 py-1 rounded-full bg-gradient-to-br">{{ type | titlecase }}</span>
						</div>

						<p class="text-center text-sm text-gray-600">{{ pokemon.flavorText }}</p>

						<div class="stats flex justify-between text-sm">
							<div class="hp text-center">
								<span class="font-semibold text-green-600">HP</span>
								<p>{{ pokemon.hp }}</p>
							</div>
							
							<div class="set text-center">
								<span class="font-semibold text-yellow-600">Set</span>
								<p>{{ pokemon.set.name }}</p>
							</div>
						</div>

						<div class="attack ">
								<span class="font-semibold text-red-600">Attaque(s)</span>
								@for(attack of pokemon.attacks; track attack) {
									<div class="flex items-start gap-2">
										<div class="grid grid-cols-2 gap-1 justify-center w-fit">
											<div *ngFor="let cost of attack.cost; let i = index" [ngClass]="'type-' + cost.toLowerCase()" class="w-4 h-4 rounded-full animate-pulse-glow"></div>
										</div>
										<div class="flex-1 flex flex-col justify-center">
											<h3 class="font-bold text-sm">{{ attack.name }}</h3>
											<p class="text-xs text-neutral-600">{{ attack.text }}</p>
										</div>
										<span class="font-bold ">{{ attack.damage || '' }}</span>
									</div>
								}
							</div>

						<div class="weakness-resistance *:gap-2 flex justify-between text-xs mt-3">
							<div class="weakness">
								<span class="font-semibold text-red-600">Faiblesse</span>
								<p *ngFor="let weakness of pokemon?.weaknesses">
									<span class="type-{{weakness.type.toLowerCase()}} bg-gradient-to-r rounded-full px-2 py-0.5">{{ weakness.type | titlecase }} {{ weakness.value }}</span>
								</p>
							</div>
							<div class="resistance">
								<span class="font-semibold text-blue-600">Resistance</span>
								<p *ngFor="let resistance of pokemon?.resistances">
									<span class="type-{{resistance.type.toLowerCase()}} bg-gradient-to-r rounded-full px-2 py-0.5">{{ resistance.type | titlecase }} {{ resistance.value }}</span>
								</p>
							</div>
						</div>

						<div class="retreat-cost text-center mt-3">
							<span class="font-semibold text-gray-700">Retraite</span>
							<div class="flex justify-center gap-2">
								<div *ngFor="let cost of pokemon?.retreatCost" class="cost-type w-6 h-6 rounded-full bg-gradient-to-br animate-pulse-glow"></div>
							</div>
						</div>

						<div class="additional-details space-y-2 text-sm">
							<p><strong>Artiste:</strong> {{ pokemon.artist }}</p>
							<p><strong>Rareté:</strong> {{ pokemon.rarity }}</p>
							<p><strong>National Pokedex Numero:</strong> {{ pokemon.nationalPokedexNumbers.join(', ') }}</p>
							<p><strong>Date de sorti:</strong> {{ pokemon.set.releaseDate | date:'mediumDate' }}</p>
							<p><strong>Prix Moyen:</strong> {{pokemon.cardmarket?.prices?.averageSellPrice | currency:'EUR'}}</p>
						</div>

						<div class="evolution text-center mt-4">
							<span class="font-semibold text-purple-600">Évolue en:</span>
							<div *ngIf="pokemon.evolvesTo.length > 0">
								<p *ngFor="let evolve of pokemon.evolvesTo">
								<a *ngIf="evolutionId" [routerLink]="['/pokemon', evolutionId]" class="text-blue-600 hover:underline">
									{{ evolve | titlecase }}
								</a>
								<span *ngIf="!evolutionId">Chargement...</span>
								</p>
							</div>
							<div *ngIf="pokemon.evolvesTo?.length === 0">
								<p>Aucune évolution</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="card-footer text-sm text-center text-gray-500 mt-6">
			<p><a [href]="pokemon.tcgplayer.url" target="_blank" class="text-blue-600 hover:underline">Voir sur TCGPlayer</a></p>
			<p><a [href]="pokemon.cardmarket.url" target="_blank" class="text-blue-600 hover:underline">Voir sur CardMarket</a></p>
		</div>
	</div>

  `,
	styles: [
		`
		.pokemon-detail {
			background-image: url('https://example.com/pokemon-background.jpg');
			background-size: cover;
			background-position: center;
		}

		.card-container {
			display: flex;
			justify-content: center;
		}

		.card {
			position: relative;
			transition: all 0.6s ease;
		}

		.pokemon-image-container {
			position: relative;
			overflow: hidden;
			width: 100%;
			height: 600px;
		}

		.pokemon-image {
			position: absolute;
			inset: 0;
			object-fit: contain; /* Permet à l'image de s'ajuster sans déformation */
			filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.3));
		}


		.pokemon-info {
			background-color: rgba(255, 255, 255, 0.85);
			backdrop-filter: blur(10px);
			padding: 1rem;
		}

		.pokemon-type {
			background-color: rgba(0, 128, 0, 0.6);
		}

		.pokemon-type:hover {
			background-color: rgba(0, 128, 0, 1);
		}

		.animate-pulse-glow {
			animation: pulse-glow 1.5s infinite ease-in-out;
		}

		@keyframes pulse-glow {
			0% { opacity: 0.3; }
			50% { opacity: 0.7; }
			100% { opacity: 0.3; }
		}

		.card-footer {
			font-size: 0.9rem;
		}

		.additional-details {
			padding-top: 1rem;
			color: #444;
		}

		.additional-details p {
			margin: 0.5rem 0;
		}
    `
	]
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
	pokemon: any = null;
	evolutionId: string | null = null;
	errorMessage: string | null = null;
	private routeSub: Subscription | undefined;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private pokemonService: PokemonService,
		private http: HttpClient
	) { }

	ngOnInit(): void {
		this.routeSub = this.route.params.subscribe(params => {
			const id = params['id'];
			if (id) {
				this.loadPokemon(id);
			}
		});
	}

	ngOnDestroy(): void {
		if (this.routeSub) {
			this.routeSub.unsubscribe();
		}
	}

	private loadPokemon(id: string): void {
		this.pokemonService.getPokemonById(id).subscribe(
			pokemon => {
				if (!pokemon) {
					this.handleInvalidId();
					return;
				}

				this.pokemon = pokemon;
				this.errorMessage = null;

				if (!Array.isArray(this.pokemon.evolvesTo)) {
					this.pokemon.evolvesTo = [];
				}

				if (this.pokemon.evolvesTo.length > 0) {
					this.fetchEvolutionId(this.pokemon.evolvesTo[0]).then(id => {
						this.evolutionId = id;
					});
				}
			},
			() => {
				this.handleInvalidId();
			}
		);
	}

	private fetchEvolutionId(evolutionName: string): Promise<string | null> {
		const url = `https://api.pokemontcg.io/v2/cards?q=name:${evolutionName}`;
		return this.http.get<any>(url).toPromise().then(data => {
			if (data.data.length > 0) {
				return data.data[0].id;
			}
			return null;
		}).catch(() => {
			return null;
		});
	}

	private handleInvalidId(): void {
		this.pokemon = null;
		this.errorMessage = "Aucun Pokémon trouvé avec cet ID.";
		setTimeout(() => {
			this.router.navigate(['/']);
		}, 1000);
	}
}