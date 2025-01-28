import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
	name: 'sortByDate'
})

export class SortByDate implements PipeTransform {
	transform(products: Product[], sortSelected: string): Product[] {
		return products.sort((a, b) => {
			switch (sortSelected) {
				case '+ Récent':
					return b.createdDate.getTime() - a.createdDate.getTime();
				case '- Récent':
					return a.createdDate.getTime() - b.createdDate.getTime();
				default:
					return 0;
			}
		});
	}
} 