import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon';

@Pipe({
	name: 'sortByPrice'
})
export class SortByPrice implements PipeTransform {
	transform(pokemons: Pokemon[], sortSelected: string): Pokemon[] {
		return pokemons.sort((a, b) => {
			const priceA = a.cardmarket?.prices?.averageSellPrice ?? 0;
			const priceB = b.cardmarket?.prices?.averageSellPrice ?? 0;

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
