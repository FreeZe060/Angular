import { Component, inject } from '@angular/core';
import { ProductService } from '../product-service.service';

@Component({
	selector: 'app-navbar',
	standalone: true,
	template: `
		<div class="fixed p-4 w-full z-10">
			<div class="p-5 text-gray-500 bg-gray-900 rounded-lg shadow-lg font-medium capitalize">
				<span class="px-3 py-1 pr-4 border-r border-gray-800">
					<img src="assets/images/SonoryLogo.png" alt="LogoSonory" class="w-8 h-8 -mt-1 inline mx-auto" />
				</span>

				<a routerLink="/" class="px-6 hover:text-gray-300 cursor-pointer transition-all duration-300"
					[class.text-gray-300]="activeRoute === '/'">
					<i class="fas fa-home p-2 bg-gray-800 rounded-full"></i>
				</a>

				<a routerLink="/songs"
					class="px-3 py-1 relative cursor-pointer hover:text-gray-300 text-base rounded mb-5 transition-all duration-300"
					[class.text-gray-300]="activeRoute === '/songs'">
					<i class="w-8 fas fa-address-card p-2 bg-gray-800 rounded-full"></i>
					<span class="mx-1">Produits</span>
					<span class="absolute left-0 ml-8 -mt-2 text-xs bg-gray-700 font-medium px-2 shadow-lg rounded-full">
						{{ productCount }}
					</span>
				</a>

				<a routerLink="/artists"
					class="px-3 py-1 relative cursor-pointer hover:text-gray-300 text-base rounded mb-5 transition-all duration-300"
					[class.text-gray-300]="activeRoute === '/artists'">
					<i class="w-8 fa-solid fa-heart p-2 bg-gray-800 rounded-full"></i>
					<span class="mx-1">Favoris</span>
					<span class="absolute left-0 ml-8 -mt-2 text-xs bg-gray-700 font-medium px-2 shadow-lg rounded-full">
						{{ favoritesCount }}
					</span>
				</a>

				<span class="px-1 hover:text-white cursor-pointer transition-all duration-300">
					<i class="fas fa-search p-2 bg-gray-800 rounded-full"></i>
				</span>

				<span class="px-1 hover:text-white cursor-pointer w-8 relative float-right mr-3 transition-all duration-300">
					<i class="w-8 fas fa-bell p-2 bg-gray-800 rounded-full"></i>
					<span
						class="absolute right-0 top-0 -mt-2 -mr-1 text-xs bg-red-500 text-white font-medium px-2 shadow-lg rounded-full">
						3
					</span>
				</span>
				<span class="hover:text-white cursor-pointer w-10 relative float-right mr-3 transition-all duration-300">
					<i class="fas fa-user p-2 bg-gray-800 rounded-full"></i>
					<span
						class="absolute right-0 top-0 -mt-1 -mr-1 text-xs bg-yellow-500 text-black font-medium px-2 rounded-full">
						3
					</span>
				</span>
			</div>
		</div>
		<div class="h-[104px]"></div>
	`,
	styles: []
})

export class NavbarComponent {
	activeRoute: string = '/';
	productService = inject(ProductService);
	productCount: number = this.productService.getNumberOfProducts();
	favoritesCount: number = this.productService.getNumberOfFavorites();
}