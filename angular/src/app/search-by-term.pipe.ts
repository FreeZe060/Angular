import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
	name: 'searchByTerm'
})
export class SearchByTermPipe implements PipeTransform {

	transform(products: Product[], searchTerm: string): Product[] {
		if (!searchTerm) {
			return products;
		}
		return products.filter(product =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}
}
