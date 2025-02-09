import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon';

@Pipe({
  name: 'sortByHp'
})
export class SortByHp implements PipeTransform {
  transform(pokemons: Pokemon[], sortSelected: string): Pokemon[] {
    return pokemons.sort((a, b) => {
      const hpA = parseInt(a.hp, 10);
      const hpB = parseInt(b.hp, 10);

      switch (sortSelected) {
        case 'hp_asc':
          return hpA - hpB;
        case 'hp_desc':
          return hpB - hpA;
        default:
          return 0;
      }
    });
  }
}
