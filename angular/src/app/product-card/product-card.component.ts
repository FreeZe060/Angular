import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Product, Rarity } from '../product';
import { DatePipe, CommonModule } from '@angular/common';
import { ProductService } from '../product-service.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-product-card',
	imports: [DatePipe, CommonModule],
	template: `
		<div class="flex-shrink-0 m-6 relative overflow-hidden rounded-lg max-w-xs shadow-lg hover:translate-y-2 transition-transform duration-300"
			[ngClass]="[getRarityColor(product.rarity).bgColor]"
			(click)="navigateToProduct(product.id)"
			style="cursor: pointer;">
			<svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style="transform: scale(1.5); opacity: 0.1;">
				<rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white"/>
				<rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white"/> 
			</svg>
			<div class="relative pt-10 px-10 flex items-center justify-center">
				<div class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style="background: radial-gradient(black, transparent 60%); transform: rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1); opacity: 0.2;"></div>
				<img class="relative w-40 h-[214px] rounded" [src]="product.img" alt="{{ product.name }}">
			</div>
			<div class="relative text-white px-6 pb-6 mt-6">
				<span class="block opacity-75 -mb-1">{{product.createdDate | date:'shortDate'}}</span>
				<div class="flex justify-between">
					<span class="block font-semibold text-l">{{product.name}}</span>
				</div>
			</div>
			<div class="relative text-white px-6 pb-6 mb-1">
				<span class="bg-white rounded-full text-sm font-bold px-3 py-2 leading-none flex items-center justify-between" [ngClass]="[getRarityColor(product.rarity).textColor]">
					{{ product.price }}€

					<div class="flex items-center">
						@if (product.isFavorite) {
							<span class="flex">
								<button (click)="switchFav(); $event.stopPropagation()"><i class="fa-solid fa-heart fa-lg mr-3"></i></button>
							</span>
						} @else {
							<span class="flex">
								<button (click)="switchFav(); $event.stopPropagation()"><i class="hover:fa-solid fa-regular fa-heart fa-lg mr-3"></i></button>
							</span>
						}
						
						<button (click)="addtoCart(); $event.stopPropagation()"><i class="fa-solid fa-cart-shopping fa-lg"></i></button>
					</div>
				</span>
			</div>

			<div class="absolute bottom-0 p-1 pl-2 font-semibold text-sm" [ngClass]="[getRarityColor(product.rarity).textColor]">{{ product.rarity }}</div>
		</div>
	`,
	styles: ``
})
export class ProductCardComponent {
	@Input({ required: true }) product: Product = { id: 0, name: '', createdDate: new Date(), isFavorite: false, rarity: Rarity.Common, price: 0, img: '' };

	@Output() addItemEvent = new EventEmitter<number>();
	productService = inject(ProductService);

	private router = inject(Router);
	navigateToProduct(productId: number) {
		this.router.navigate(['/product', productId]);
	}

	switchFav() {
		this.productService.switchFav(this.product);
		this.addItemEvent.emit(this.product.isFavorite ? 1 : -1);
	}

	addtoCart() {
		this.productService.addToCart(this.product);
		this.addItemEvent.emit(1);
	}

	getRarityColor(rarity: Rarity): { textColor: string, bgColor: string } {
		switch (rarity) {
			case Rarity.Common:
				return { textColor: 'text-gray-600', bgColor: 'bg-gray-500' };
			case Rarity.Uncommon:
				return { textColor: 'text-green-600', bgColor: 'bg-green-500' };
			case Rarity.Rare:
				return { textColor: 'text-teal-600', bgColor: 'bg-teal-500' };
			case Rarity.Epic:
				return { textColor: 'text-purple-600', bgColor: 'bg-purple-500' };
			case Rarity.Legendary:
				return { textColor: 'text-orange-600', bgColor: 'bg-orange-500' };
			default:
				return { textColor: 'text-gray-600', bgColor: 'bg-gray-500' };
		}
	}
}