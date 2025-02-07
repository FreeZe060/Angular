import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon';

@Pipe({
  name: 'sortByPrice'
})
export class SortByPrice implements PipeTransform {
  transform(pokemons: Pokemon[], sortSelected: string): Pokemon[] {
    return pokemons.sort((a, b) => {
      switch (sortSelected) {
        case 'price_asc':
          return a.prixMoyen - b.prixMoyen;
        case 'price_desc':
          return b.prixMoyen - a.prixMoyen;
        default:
          return 0;
      }
    });
  }
}
