import { Component, Output, EventEmitter, inject } from '@angular/core';
import { Product, Rarity } from '../product';
import { ProductService } from '../product-service.service';

import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
	selector: 'app-product-detail',
	imports: [ProductCardComponent],
	template: `
		<div class="flex justify-center items-center p-5 gap-5 flex-wrap">
			<app-product-card [product]="product"></app-product-card>
		</div>	
  `,
	styles: ``
})
export class ProductDetailComponent {

	product: Product = { id: 0, name: '', createdDate: new Date(), isFavorite: false, rarity: Rarity.Common, price: 0, img: '' };
	@Output() addItemEvent = new EventEmitter<number>();
	productService = inject(ProductService);

	constructor(private route: ActivatedRoute) {
		this.route.params.subscribe((params) => {
			this.product = this.productService.getProduct(parseInt(params["id"])) || { id: 0, name: 'Produit non trouvé', createdDate: new Date(), isFavorite: false, rarity: Rarity.Common, price: 0, img: '' };
		})
	}

	switchFav() {
		this.productService.switchFav(this.product);
		this.addItemEvent.emit(this.product.isFavorite ? 1 : -1);
	}
}	
