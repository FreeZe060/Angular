import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon';

@Pipe({
  name: 'pokemonSearchFilter',
  pure: false
})
export class PokemonSearchFilterPipe implements PipeTransform {
  transform(pokemons: Pokemon[], searchName?: string, selectedType?: string): Pokemon[] {
    if (!pokemons) return [];

    return pokemons.filter(pokemon =>
      (!searchName || pokemon.nom.toLowerCase().includes(searchName.toLowerCase())) &&
      (!selectedType || pokemon.type?.toLowerCase() === selectedType.toLowerCase())
    );
  }
}
