import { Component, Input, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { TitleCasePipe, CommonModule } from '@angular/common';

@Component({
	selector: 'app-pokemon-card',
    imports: [PokemonCardComponent, TitleCasePipe, CommonModule],
	template: `
    <div class="card-container animate-float">
		<div class="card w-72 sm:w-80 rounded-xl overflow-hidden">
			<div class="glow-effect"></div>
			<div class="rainbow-border"></div>
			<div class="relative bg-gradient-to-br from-orange-400 via-amber-500 to-rose-500 p-3 rounded-xl">
			<div class="shine-lines"></div>
			<div class="flex justify-between items-start mb-2">
				<h2 class="text-lg font-bold text-white">{{pokemon.name}}</h2>
				<div class="flex items-center gap-1">
				<span class="text-white font-bold">HP</span>
				<span class="text-white font-bold">{{pokemon.hp}}</span>
				</div>
			</div>

			<div class="relative aspect-square mb-3 rounded-lg overflow-hidden">
				<div class="absolute inset-0 bg-gradient-to-br from-orange-200 to-rose-200"></div>
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
                            <span [ngClass]="'type-' + type" class=" text-xs px-2 py-1 rounded-full">{{ type | titlecase }}</span>
                        }
                    </div>
                    <span class="text-xs text-neutral-600">Stage 2</span>
                </div>

                <div class="space-y-2">
                    @if(pokemon.attacks[0]) {
                        <div class="flex items-start gap-2 min-h-[120px]"> 
                            <div class="flex gap-1">
                                <div class="w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-red-500 animate-pulse-glow"></div>
                                <div class="w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-red-500 animate-pulse-glow"></div>
                            </div>
                            <div class="flex-1 flex flex-col justify-center"> 
                                <h3 class="font-bold text-sm">{{ pokemon.attacks[0].name }}</h3>
                                <p class="text-xs text-neutral-600">{{ pokemon.attacks[0].text }}</p>
                            </div>
                            <span class="font-bold ml-auto self-center">{{ pokemon.attacks[0].damage || 'N/A' }}</span> 
                        </div>
                    }

                    <div class="flex items-center justify-between text-xs pt-2 border-t border-neutral-200">
                        <div>
                            <span class="text-neutral-600">Weakness</span>
                            <span class="ml-1 type-fire text-white px-2 py-0.5 rounded-full">Water</span>
                        </div>
                        <div>
                            <span class="text-neutral-600">Resistance</span>
                            <span class="ml-1 bg-neutral-200 px-2 py-0.5 rounded-full">-30</span>
                        </div>
                        <div>
                            <span class="text-neutral-600">Retreat Cost</span>
                            <span class="ml-1 bg-neutral-800 text-white px-2 py-0.5 rounded-full">3</span>
                        </div>
                    </div>
                </div>
            </div>


			<div class="mt-3 text-[10px] text-white/80 text-center italic">
				Spits fire that is hot enough to melt boulders. Known to unintentionally cause forest fires. ©2024 Pokemon
                {{pokemon.prixMoyen}}
			</div>
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
            animation: rainbow 6s linear infinite;
        }

        /* Type Eau */
        .type-water {
            background: linear-gradient(45deg, #00bfff, #1e90ff);
            animation: rainbow 6s linear infinite;
        }

        /* Type Plante */
        .type-grass {
            background: linear-gradient(45deg, #2e8b57, #228b22);
            animation: rainbow 6s linear infinite;
        }

        /* Type Électrique */
        .type-electric {
            background: linear-gradient(45deg, #f7df1e, #ffcc00);
            animation: rainbow 6s linear infinite;
        }

        /* Type Glace */
        .type-ice {
            background: linear-gradient(45deg, #b3e0ff, #00ffff);
            animation: rainbow 6s linear infinite;
        }

        /* Type Normal */
        .type-normal {
            background: linear-gradient(45deg, #d3d3d3, #a9a9a9);
            animation: rainbow 6s linear infinite;
        }

        /* Type Insecte */
        .type-bug {
            background: linear-gradient(45deg, #7fff00, #32cd32);
            animation: rainbow 6s linear infinite;
        }

        /* Type Fée */
        .type-fairy {
            background: linear-gradient(45deg, #ffb6c1, #ff69b4);
            animation: rainbow 6s linear infinite;
        }

        /* Type Psy */
        .type-psychic {
            background: linear-gradient(45deg, #ff66cc, #9933cc);
            animation: rainbow 6s linear infinite;
        }

        /* Type Sombre */
        .type-dark {
            background: linear-gradient(45deg, #4b0082, #800080);
            animation: rainbow 6s linear infinite;
        }

        /* Type Acier */
        .type-steel {
            background: linear-gradient(45deg, #b0c4de, #4682b4);
            animation: rainbow 6s linear infinite;
        }

        /* Type Combat */
        .type-fighting {
            background: linear-gradient(45deg, #ff4500, #8b0000);
            animation: rainbow 6s linear infinite;
        }

        /* Type Vol */
        .type-flying {
            background: linear-gradient(45deg, #87ceeb, #4682b4);
            animation: rainbow 6s linear infinite;
        }

        /* Type Fantôme */
        .type-ghost {
            background: linear-gradient(45deg, #6a5acd, #8a2be2);
            animation: rainbow 6s linear infinite;
        }

        /* Type Roche */
        .type-rock {
            background: linear-gradient(45deg, #b22222, #a52a2a);
            animation: rainbow 6s linear infinite;
        }

        /* Type Dragon */
        .type-dragon {
            background: linear-gradient(45deg, #ff0000, #b22222);
            animation: rainbow 6s linear infinite;
        }

        /* Type Ténèbres */
        .type-evil {
            background: linear-gradient(45deg, #000000, #2f4f4f);
            animation: rainbow 6s linear infinite;
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
            position: absolute;
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
            transform: scale(1.1) translateZ(20px);
            filter: drop-shadow(0 0 20px rgba(255, 138, 0, 0.5));
        }
		`
})
export class PokemonCardComponent implements OnChanges {
	@Input() pokemon: any;

	constructor() {}

	ngOnChanges(changes: SimpleChanges) {
        console.log("Pokemon reçu :", this.pokemon);
    }
    
}
