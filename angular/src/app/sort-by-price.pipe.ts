import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon';

@Pipe({
	name: 'sortByPrice'
})
export class SortByPrice implements PipeTransform {
	transform(pokemons: Pokemon[], sortSelected: string): Pokemon[] {
		return pokemons.sort((a, b) => {
			let priceA: number, priceB: number;

			if (a.tcgplayer?.prices?.normal) {
				priceA = a.tcgplayer.prices.normal.low;
			} else {
				priceA = 0;
			}

			if (b.tcgplayer?.prices?.normal) {
				priceB = b.tcgplayer.prices.normal.low;
			} else {
				priceB = 0;
			}

			switch (sortSelected) {
				case 'price_asc':
					return priceA - priceB;
				case 'price_desc':
					return priceB - priceA;
				default:
					return 0;
			}
		});
	}
}
