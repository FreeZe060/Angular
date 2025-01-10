import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Product } from '../product';
import { DatePipe } from '@angular/common';
import { ProductService } from '../product-service.service';

@Component({
	selector: 'app-product-card',
	imports: [DatePipe],
	template: `
	<!-- <div class="p-5 min-w-60 rounded-xl shadow-xl bg-white">
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
	</div> -->
	<div class="relative bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl">
            <div class="">
                <p class="text-xl font-semibold my-2">{{product.name}}</p>
                <div class="flex space-x-2 text-gray-400 text-sm my-3">
                    <!-- svg  -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                     <p>{{product.createdDate | date:'fullDate':'':'fr'}}</p> 
                </div>
                <div class="border-t-2"></div>

                <div class="flex justify-between">
                    <div class="my-2">
						<p class="font-semibold text-base mb-2">Favoris</p>
						@if (product.isFavorite) {
							<span><b>Product is a favorite</b>
								<button (click)="switchFav()">Unfavorite</button>
							</span>
						} @else {
							<span>Simple Product
								<button class="bg-grey" (click)="switchFav()">Make Favorite</button>
							</span>
						}
                    </div>
                </div>
            </div>
        </div>

	`,
	styles: ``
})
export class ProductCardComponent {
	@Input({ required: true }) product: Product = { id: 0, name: '', createdDate: new Date(), isFavorite: false };
	@Output() addItemEvent = new EventEmitter<number>();
	productService = inject(ProductService);

	switchFav() {
		this.productService.switchFav(this.product);
		this.addItemEvent.emit(this.product.isFavorite ? 1 : -1);
	}
}
