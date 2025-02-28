import { Component, inject } from '@angular/core';
import { Product, Rarity } from '../product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product-service.service';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
	selector: 'app-product-detail',
	imports: [DatePipe, CommonModule],
	template: `
		<div class="min-h-screen bg-gray-100 flex flex-col items-center py-10">
			<div class="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
				<!-- Si le produit existe -->
				<ng-container *ngIf="product; else notFound">
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
				</ng-container>

				<!-- Si le produit n'existe pas -->
				<ng-template #notFound>
					<div class="text-center">
						<h1 class="text-3xl font-bold text-gray-800">Produit non trouvé</h1>
						<p class="text-gray-500 mt-2">Le produit demandé n'existe pas ou a été supprimé.</p>
						<button
							(click)="goBack()"
							class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
						>
							Retour à la boutique
						</button>
					</div>
				</ng-template>
			</div>
		</div>
	`,
	styles: [],
})
export class ProductDetailComponent {
	product: Product | null = null;

	private route = inject(ActivatedRoute);
	private router = inject(Router);
	private productService = inject(ProductService);

	constructor() {
		this.route.params.subscribe((params) => {
			const productId = parseInt(params['id'], 10);
			this.product = this.productService.getProduct(productId) || null;
		});
	}

	switchFav() {
		if (this.product) {
			this.productService.switchFav(this.product);
		}
	}

	addToCart() {
		if (this.product) {
			this.productService.addToCart(this.product);
		}
	}

	goBack() {
		this.router.navigate(['/']);
	}
}
