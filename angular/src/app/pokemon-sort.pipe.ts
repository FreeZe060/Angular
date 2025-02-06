import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon';

@Pipe({
  name: 'pokemonSort'
})
export class PokemonSortPipe implements PipeTransform {
  transform(pokemons: Pokemon[], sortBy?: string, order: string = 'asc'): Pokemon[] {
    if (!pokemons || !sortBy) return pokemons;

    return [...pokemons].sort((a, b) => {
      let valA, valB;

      switch (sortBy) {
        case 'name_asc': 
          valA = a.nom?.toLowerCase() ?? '';
          valB = b.nom?.toLowerCase() ?? '';
          return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);

        case 'name_desc':
          valA = a.nom?.toLowerCase() ?? '';
          valB = b.nom?.toLowerCase() ?? '';
          return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);

        case 'price_asc': 
          valA = a.prixMoyen ?? 0;
          valB = b.prixMoyen ?? 0;
          return order === 'asc' ? valA - valB : valB - valA;

        case 'price_desc':
          valA = a.prixMoyen ?? 0;
          valB = b.prixMoyen ?? 0;
          return order === 'asc' ? valA - valB : valB - valA;

        case 'hp_asc': 
          valA = a.hp ?? 0;  
          valB = b.hp ?? 0;
          return order === 'asc' ? valA - valB : valB - valA;

        case 'hp_desc':
          valA = a.hp ?? 0;
          valB = b.hp ?? 0;
          return order === 'asc' ? valA - valB : valB - valA;

        default: return 0;
      }
    });
  }
}