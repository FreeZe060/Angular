import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon';

@Pipe({
  name: 'sortByRarity',
  pure: false
})
export class SortByRarity implements PipeTransform {
  transform(pokemons: Pokemon[], selectedRarity: string): Pokemon[] {
    if (!pokemons || !selectedRarity) return pokemons; 

    return pokemons.filter(pokemon => {
      return pokemon.rarity?.toLowerCase() === selectedRarity.toLowerCase();
    });
  }
}
