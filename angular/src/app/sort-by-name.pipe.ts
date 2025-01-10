import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
	name: 'sortByName'
})
export class SortByName implements PipeTransform {
	transform(products: Product[], sortSelected: string): Product[] {
		return products.sort((a, b) => {
			switch (sortSelected) {
				case 'A-Z':
					return a.name.localeCompare(b.name);
				case 'Z-A':
					return b.name.localeCompare(a.name);
				default:
					return 0;
			}
		});
	}
}
