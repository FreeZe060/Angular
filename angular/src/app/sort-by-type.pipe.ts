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
      return pokemon.type?.toLowerCase() === selectedType.toLowerCase();
    });
  }
}
