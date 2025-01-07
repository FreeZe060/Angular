import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-product-card',
	imports: [DatePipe],
	template: `
	<div>
		<h1>{{product.name}}</h1>
		<h3>{{product.createdDate | date:'fullDate':'':'fr'}}</h3>
		@if (product.isFavorite) {
			<span><b>Product is a favorite</b>
				<button (click)="switchFav()">Unfavorite</button>
			</span>
		} @else {
			<span>Simple Product
				<button (click)="switchFav()">Make Favorite</button>
			</span>
		}
	</div>
	`,
	styles: ``
})
export class ProductCardComponent {
	@Input({required: true}) product: Product = { id: 0, name: '', createdDate: new Date(), isFavorite: false };
	@Output() addItemEvent = new EventEmitter<number>();

	switchFav() {
		this.product.isFavorite = !this.product.isFavorite;
		this.addItemEvent.emit(this.product.isFavorite ? 1 : -1);
	}
}
