import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon';

@Pipe({
  name: 'sortByHp'
})
export class SortByHp implements PipeTransform {
  transform(pokemons: Pokemon[], sortSelected: string): Pokemon[] {
    return pokemons.sort((a, b) => {
      switch (sortSelected) {
        case 'hp_asc':
          return a.hp - b.hp;
        case 'hp_desc':
          return b.hp - a.hp;
        default:
          return 0;
      }
    });
  }
}
