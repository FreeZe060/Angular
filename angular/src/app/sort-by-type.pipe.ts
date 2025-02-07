import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon';

@Pipe({
  name: 'pokemonTypeFilter',
  pure: false
})
export class PokemonTypeFilter implements PipeTransform {
  transform(pokemons: Pokemon[], selectedType?: string): Pokemon[] {
    if (!pokemons || !selectedType) return pokemons;
    return pokemons.filter(pokemon => {
      return pokemon.type?.toLowerCase() === selectedType.toLowerCase();
    });
  }
}