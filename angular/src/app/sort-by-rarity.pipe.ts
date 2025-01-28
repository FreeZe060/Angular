import { Product, Rarity } from './product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByRarity'
})
export class SortByRarity implements PipeTransform {
  private rarityOrder = [Rarity.Common, Rarity.Uncommon, Rarity.Rare, Rarity.Epic, Rarity.Legendary];

  transform(products: Product[], sortSelected: Rarity): Product[] {
    if (!sortSelected) return products;

    return products.sort((a, b) => {
      const rarityA = this.rarityOrder.indexOf(a.rarity);
      const rarityB = this.rarityOrder.indexOf(b.rarity);

      return rarityA === rarityB ? a.name.localeCompare(b.name) : rarityA - rarityB;
    });
  }
}
