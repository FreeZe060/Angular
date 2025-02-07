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
          return a.prices - b.prices;
        case 'price_desc':
          return b.prices - a.prices;
        default:
          return 0;
      }
    });
  }
}
