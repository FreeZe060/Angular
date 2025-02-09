import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon';

@Pipe({
	name: 'sortByType',
	pure: false
})
export class SortByType implements PipeTransform {
	transform(pokemons: Pokemon[], selectedType?: string): Pokemon[] {
		if (!pokemons || !selectedType) return pokemons;

		return pokemons.filter(pokemon => {
			if (pokemon?.types?.length) {
				return pokemon.types.some(type => type.toLowerCase() === selectedType.toLowerCase());
			}
			return false;
		});
	}
}
