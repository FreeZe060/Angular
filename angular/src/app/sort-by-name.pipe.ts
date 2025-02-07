import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon';

@Pipe({
  name: 'sortByName'
})
export class SortByName implements PipeTransform {
  transform(pokemons: Pokemon[], sortSelected: string): Pokemon[] {
    return pokemons.sort((a, b) => {
      switch (sortSelected) {
        case 'name_asc':
          return a.nom.localeCompare(b.nom);
        case 'name_desc':
          return b.nom.localeCompare(a.nom);
        default:
          return 0;
      }
    });
  }
}
