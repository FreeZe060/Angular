import { Component, Input, OnChanges, inject } from '@angular/core';
import { TitleCasePipe, CommonModule } from '@angular/common';
import { PokemonService } from '../pokemon-service.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-pokemon-card',
    imports: [TitleCasePipe, CommonModule, RouterLink],
    template: `
    <div class="card-container animate-float" id={{pokemon.id}}>
		<div class="card w-72 sm:w-[22rem] rounded-xl overflow-hidden">
			<div class="glow-effect"></div>
			<div class="rainbow-border"></div>
			<div class="relative bg-gradient-to-br p-3 rounded-xl" [ngClass]="getGradient()">
			<div class="shine-lines"></div>
			<div class="flex justify-between items-start mb-2">
				<h2 class="text-lg font-bold text-white">{{pokemon.name}}</h2>
                <button (click)="toggleFavorite()" class="text-white">
                    <i class="fa" [ngClass]="isFavorite ? 'fa-heart' : 'fa-heart-o'"></i>
                </button>
                <a [routerLink]="['/pokemon', pokemon.id]" class="cursor-pointer text-white">
                    <i class="fa-solid fa-circle-info"></i>
                </a>
				<div class="flex items-center gap-1">
                    <div class="w-4 h-4 rounded-full bg-gradient-to-br animate-pulse-glow" [ngClass]="getGradient()"></div>
                    <span class="text-white font-bold">HP</span>
                    <span class="text-white font-bold">{{pokemon.hp}}</span>
				</div>
			</div>

			<div class="relative aspect-square mb-3 rounded-lg overflow-hidden">
				<div class="absolute inset-0 bg-gradient-to-br " [ngClass]="getGradient()"></div>
				<div class="absolute inset-0 holo-effect animate-holo-glow"></div>
				<div class="absolute inset-0 card-shine"></div>
				<div class="absolute inset-0 sparkles"></div>
				<div class="absolute inset-0 flex items-center justify-center">
				<div class="w-48 h-48 energy-symbol rounded-full animate-energy-spin opacity-20"></div>
				</div>
                <img class="cropped-image pokemon-image" [src]="pokemon?.images?.large" alt="Image de {{ pokemon?.name }}">
			</div>

			<div class="bg-white/90 backdrop-blur rounded-lg p-3 space-y-3">
                <div class="flex items-center gap-2">
                    <div>
                        @for(type of pokemon.types; track type) {
                            <span [ngClass]="'type-' + type.toLowerCase()" class=" text-xs text-white px-2 py-1 rounded-full">{{ type | titlecase }}</span>
                        }
                    </div>
                    <span class="text-xs text-neutral-600">{{pokemon.subtypes}}</span>
                </div>

                <div class="space-y-2">
                    @for(attack of pokemon.attacks; track attack) {
                        <div class="flex items-start gap-2 "> 
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

                    <div class="flex *:flex *:flex-col justify-between text-xs pt-2 border-t border-neutral-200">
                        <div>
                            <span class="text-neutral-600 text-center">Weakness</span>
                            @if(pokemon.weaknesses != null) {
                                @for(type of pokemon.weaknesses; track type) {
                                    <span [ngClass]="'type-' + type.type.toLowerCase()" class="ml-1 text-white px-2 py-0.5 rounded-full">{{ type.type | titlecase }} {{ type.value }}</span>
                                }
                            }
                        </div>
                        <div>
                            <span class="text-neutral-600 text-center">Resistance</span>
                            @if(pokemon.resistances != null) {
                                <span *ngFor="let type of pokemon.resistances; let i = index" [ngClass]="'type-' + type.type.toLowerCase()" class="ml-1 text-white px-2 py-0.5 rounded-full">{{ type.type | titlecase }} {{ type.value }}</span>
                            }   
                        </div>
                        <div>
                            <span class="text-neutral-600 text-center">Retreat Cost</span>
                            @if(pokemon.retreatCost != null) {
                                <div class="flex ml-1 px-2 py-0.5">
                                    <div *ngFor="let cost of pokemon.retreatCost; let i = index" [ngClass]="'type-' + cost.toLowerCase()" class="w-4 h-4 rounded-full ml-1 px-2 py-0.5 animate-pulse-glow"></div>
                                </div>
                            }
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                    @if (quantityInCart > 0) {
                        <div class="flex items-center gap-2">
                            <button (click)="updateQuantity(-1)" class="bg-gray-300 text-black px-2 py-1 rounded">-</button>
                            <span class="font-bold">{{ quantityInCart }}</span>
                            <button (click)="updateQuantity(1)" class="bg-blue-500 text-white px-2 py-1 rounded">+</button>
                        </div>
                    } @else {
                        <button (click)="addToCart()" class="text-gray-500"><i class="fa-solid fa-cart-plus"></i></button>
                    }
                </div>
                </div>
            </div>

			<div class="mt-3 text-[10px] text-white/80 text-center italic">
				{{pokemon.flavorText}}
                {{pokemon.prices | currency:'EUR'}}
			</div>
		</div>
	</div>
  `,
    styles: `
	.card-container {
            perspective: 1000px;
            transform-style: preserve-3d;
        }

        .card {
            position: relative;
            transform-style: preserve-3d;
            transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .card:hover {
            transform: rotateY(10deg) rotateX(5deg) scale(1.05);
            filter: brightness(1.1);
        }

        .holo-effect {
            background: linear-gradient(
                125deg,
                rgba(255,255,255,0) 0%,
                rgba(255,255,255,0.3) 10%,
                rgba(255,255,255,0.6) 45%,
                rgba(255,255,255,0.3) 90%,
                rgba(255,255,255,0) 100%
            );
            mix-blend-mode: overlay;
        }

        .energy-symbol {
            background: conic-gradient(
                from 0deg,
                #ff8a00,
                #e52e71,
                #ff8a00
            );
            filter: blur(1px);
        }

        .card-shine {
            background: linear-gradient(
                125deg,
                transparent 0%,
                rgba(255,255,255,0.3) 25%,
                transparent 50%
            );
        }

        .sparkles::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: 
                radial-gradient(circle at 20% 30%, white 0%, transparent 2%),
                radial-gradient(circle at 80% 20%, white 0%, transparent 2%),
                radial-gradient(circle at 40% 70%, white 0%, transparent 2%),
                radial-gradient(circle at 70% 50%, white 0%, transparent 2%),
                radial-gradient(circle at 60% 30%, white 0%, transparent 2%),
                radial-gradient(circle at 30% 40%, white 0%, transparent 2%),
                radial-gradient(circle at 90% 60%, white 0%, transparent 2%);
            opacity: 0;
            animation: sparkle 4s ease-in-out infinite;
        }

        .type-fire {
            background: linear-gradient(45deg, #ff8a00, #e52e71);
            
        }

        /* Type Eau */
        .type-water {
            background: linear-gradient(45deg, #00bfff, #1e90ff);
            
        }

        /* Type Plante */
        .type-grass {
            background: linear-gradient(45deg, #2e8b57, #228b22);
            
        }

        /* Type Électrique */
        .type-lightning {
            background: linear-gradient(45deg, #f7df1e, #ffcc00);
            
        }

        /* Type Glace */
        .type-ice {
            background: linear-gradient(45deg, #b3e0ff, #00ffff);
            
        }

        /* Type Normal */
        .type-colorless {
            background: linear-gradient(45deg, #d3d3d3, #a9a9a9);
            
        }

        /* Type Insecte */
        .type-bug {
            background: linear-gradient(45deg, #7fff00, #32cd32);
            
        }

        /* Type Fée */
        .type-fairy {
            background: linear-gradient(45deg, #ffb6c1, #ff69b4);
            
        }

        /* Type Psy */
        .type-psychic {
            background: linear-gradient(45deg, #ff66cc, #9933cc);
            
        }

        /* Type Sombre */
        .type-dark {
            background: linear-gradient(45deg, #4b0082, #800080);
            
        }

        /* Type Acier */
        .type-steel {
            background: linear-gradient(45deg, #b0c4de, #4682b4);
            
        }

        /* Type Combat */
        .type-fighting {
            background: linear-gradient(45deg, #ff4500, #8b0000);
            
        }

        /* Type Vol */
        .type-flying {
            background: linear-gradient(45deg, #87ceeb, #4682b4);
            
        }

        /* Type Fantôme */
        .type-ghost {
            background: linear-gradient(45deg, #6a5acd, #8a2be2);
            
        }

        /* Type Roche */
        .type-rock {
            background: linear-gradient(45deg, #b22222, #a52a2a);
            
        }

        /* Type Dragon */
        .type-dragon {
            background: linear-gradient(45deg, #888B43, #3D3B30);
            
        }

        /* Type Ténèbres */
        .type-evil {
            background: linear-gradient(45deg, #000000, #2f4f4f);
            
        }

        /* Animation pour les types */
        @keyframes rainbow {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
        }

        .rainbow-border {
            position: absolute;
            inset: -2px;
            background: linear-gradient(45deg, #ff8a00, #e52e71, #ff8a00, #e52e71);
            background-size: 200% 200%;
            animation: shine 4s linear infinite;
            border-radius: 1rem;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .card:hover .rainbow-border {
            opacity: 1;
        }

        .glow-effect {
            position: absolute;
            inset: -20px;
            background: radial-gradient(circle at center, rgba(255,138,0,0.3), transparent 70%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .card:hover .glow-effect {
            opacity: 1;
            animation: pulse-glow 2s ease-in-out infinite;
        }

        .shine-lines {
            inset: 0;
            background: repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,255,255,0.1) 10px,
                rgba(255,255,255,0.1) 20px
            );
            animation: tilt-shine 1.5s ease-in-out infinite;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .card:hover .shine-lines {
            opacity: 1;
        }

        .pokemon-image {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
            z-index: 10;
            transform-style: preserve-3d;
            transition: transform 0.3s ease;
            filter: drop-shadow(0 0 10px rgba(255, 138, 0, 0.3));
        }

        .card:hover .pokemon-image {
            transform: scale(1.0) translateZ(0px);
            filter: drop-shadow(0 0 20px rgba(255, 138, 0, 0.5));
        }
		`
})
export class PokemonCardComponent {
    @Input() pokemon: any;
    quantityInCart: number = 0;
    private pokemonService = inject(PokemonService);

    ngOnInit() {
        this.pokemonService.cart$.subscribe(cart => {
            const item = cart.find(item => item.pokemon.id === this.pokemon.id);
            this.quantityInCart = item ? item.quantity : 0;
        });
    }

    getGradient(): string {
        if (!this.pokemon || !this.pokemon.types || this.pokemon.types.length === 0) {
            return 'from-gray-400 via-gray-500 to-gray-600';
        }

        const type = this.pokemon.types[0].toLowerCase();

        const gradients: { [key: string]: string } = {
            fire: 'from-orange-400 via-amber-500 to-red-500',
            water: 'from-blue-400 via-blue-500 to-cyan-500',
            grass: 'from-green-400 via-lime-500 to-green-600',
            electric: 'from-yellow-300 via-yellow-500 to-orange-500',
            ice: 'from-blue-300 via-teal-400 to-cyan-500',
            psychic: 'from-pink-400 via-purple-500 to-pink-600',
            dark: 'from-gray-800 via-gray-900 to-black',
            fighting: 'from-red-500 via-orange-600 to-red-700',
            steel: 'from-gray-400 via-gray-500 to-gray-600',
            dragon: 'from-[#888B43] via-[#B8A900] to-[#3D3B30]',
            fairy: 'from-pink-300 via-pink-400 to-pink-500',
            bug: 'from-green-500 via-green-600 to-lime-500',
            rock: 'from-yellow-600 via-yellow-700 to-yellow-800',
            ghost: 'from-purple-500 via-indigo-600 to-purple-700',
            poison: 'from-purple-400 via-purple-500 to-indigo-600',
            flying: 'from-sky-400 via-indigo-400 to-blue-500',
            normal: 'from-gray-300 via-gray-400 to-gray-500',
            ground: 'from-yellow-500 via-yellow-600 to-orange-700'
        };

        return gradients[type] || 'from-gray-400 via-gray-500 to-gray-600';
    }

	get isFavorite(): boolean {
		return this.pokemonService.isPokemonFavorite(this.pokemon.id);
	}

	toggleFavorite() {
		this.pokemonService.switchFavorite(this.pokemon);
	}

	addToCart() {
		this.pokemonService.addToCart(this.pokemon, 1);
	}

	updateQuantity(change: number) {
		const newQuantity = this.quantityInCart + change;
		if (newQuantity < 1) {
			this.pokemonService.removeFromCart(this.pokemon.id);
		} else {
			this.pokemonService.updateCartQuantity(this.pokemon.id, newQuantity);
		}
	}
}