import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon';

@Pipe({
  name: 'pokemonRarityFilter',
  pure: false
})
export class PokemonRarityFilter implements PipeTransform {
  transform(pokemons: Pokemon[], selectedRarity: string): Pokemon[] {
    if (!pokemons || !selectedRarity) return pokemons; // Si aucune rareté n'est sélectionnée, renvoie tous les Pokémon

    return pokemons.filter(pokemon => {
      return pokemon.rareté?.toLowerCase() === selectedRarity.toLowerCase();
    });
  }
}
