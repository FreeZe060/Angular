import { Component, inject } from '@angular/core';
import { Product, Rarity } from '../product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product-service.service';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
	selector: 'app-product-detail',
	imports: [DatePipe, CommonModule],
	template: `
		<div class="min-h-screen bg-gray-100 flex flex-col items-center py-10">
			<div class="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<img
						class="w-full rounded-lg shadow-lg"
						[src]="product.img"
						alt="{{ product.name }}"
					/>
					<div>
						<h1 class="text-3xl font-bold text-gray-800">{{ product.name }}</h1>
						<p class="text-gray-500 mt-2">
							Date de création : {{ product.createdDate | date: 'mediumDate' }}
						</p>
						<p class="mt-4 text-2xl font-bold text-gray-800">{{ product.price }}€</p>
						<div class="flex gap-4 mt-6">
							<button
								(click)="switchFav()"
								class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
							>
								{{ product.isFavorite ? 'Retirer des Favoris' : 'Ajouter aux Favoris' }}
							</button>
							<button
								(click)="addToCart()"
								class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
							>
								Ajouter au Panier
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	`,
	styles: [],
})
export class ProductDetailComponent {
	product: Product = {
		id: 0,
		name: '',
		createdDate: new Date(),
		isFavorite: false,
		rarity: Rarity.Common,
		price: 0,
		img: '',
	};

	private route = inject(ActivatedRoute);
	private productService = inject(ProductService);

	constructor() {
		this.route.params.subscribe((params) => {
			this.product =
				this.productService.getProduct(parseInt(params['id'])) ||
				({
					id: 0,
					name: 'Produit non trouvé',
					createdDate: new Date(),
					isFavorite: false,
					rarity: Rarity.Common,
					price: 0,
					img: '',
				} as Product);
		});
	}

	switchFav() {
		this.productService.switchFav(this.product);
	}

	addToCart() {
		this.productService.addToCart(this.product);
	}
}