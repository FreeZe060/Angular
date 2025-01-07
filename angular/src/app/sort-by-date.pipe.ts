import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
	name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {

	transform(products: Product[], asc?:boolean): Product[] {
		return products.sort((a, b) => {
			return asc ? 
				a.createdDate.getTime() - b.createdDate.getTime() :
				b.createdDate.getTime() - a.createdDate.getTime();
		});
	}

}
