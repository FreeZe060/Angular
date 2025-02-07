import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { PokemonService } from '../pokemon-service.service';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [RouterLink, CommonModule],
	template: `
		<div class="fixed p-4 w-full z-10">
			<div class="p-5 text-gray-500 bg-gray-900 rounded-lg shadow-lg font-medium capitalize">
				<span class="px-3 py-1 pr-4 border-r border-gray-800">
					<img src="../hogwarts-logo.png" alt="LogoHogwarts" class="w-8 h-8 -mt-1 inline mx-auto" />
				</span>

				<a routerLink="" class="px-6 hover:text-gray-300 cursor-pointer transition-all duration-300"
					[class.text-gray-300]="activeRoute === '/'">
					<i class="fas fa-home p-2 bg-gray-800 rounded-full"></i>
				</a>

				<a routerLink="" href=""
					class="px-3 py-1 relative cursor-pointer hover:text-gray-300 text-base rounded mb-5 transition-all duration-300"
					[class.text-gray-300]="activeRoute.startsWith('/product')">
					<i class="w-8 fas fa-address-card p-2 bg-gray-800 rounded-full"></i>
					<span class="mx-1">Produits</span>
					<span class="absolute left-0 ml-8 -mt-2 text-xs bg-gray-700 font-medium px-2 shadow-lg rounded-full">
						{{ productCount }}
					</span>
				</a>

				<a routerLink="/favoris"
					class="px-3 py-1 relative cursor-pointer hover:text-gray-300 text-base rounded mb-5 transition-all duration-300"
					[class.text-gray-300]="activeRoute === '/favoris'">
					<i class="w-8 fa-solid fa-heart p-2 bg-gray-800 rounded-full"></i>
					<span class="mx-1">Favoris</span>
					<span class="absolute left-0 ml-8 -mt-2 text-xs bg-gray-700 font-medium px-2 shadow-lg rounded-full">
						{{ favoritesCount }}
					</span>
				</a>

				@if (isCartPopupOpen) {
					<div class="absolute bg-gray-900 text-white p-2 rounded-lg shadow-lg mt-2 w-64 right-4">
						<h3 class="font-semibold text-lg mb-2">Votre panier</h3>
						@if (cartItems.length > 0) {
							@for (item of cartItems; track item.pokemon.id) {
								<div class="flex items-center justify-between mb-3">
									<img [src]="item.pokemon.image" alt="{{ item.pokemon.name }}" class="w-12 h-12 rounded-lg" />
									<div class="">
									<p class="text-sm font-medium">{{ item.pokemon.name }}</p>
									<p class="text-xs text-gray-400">{{ item.pokemon.prices | currency:'EUR' }}</p>
									<div class="flex items-center">
										<button (click)="updateQuantity(+item.pokemon.id, item.quantity - 1)" class="text-gray-500 hover:text-gray-300">
										-
										</button>
										<span class="mx-2">{{ item.quantity }}</span>
										<button (click)="updateQuantity(+item.pokemon.id, item.quantity + 1)" class="text-gray-500 hover:text-gray-300">
										+
										</button>
									</div>
									</div>
									<button (click)="removeFromCart(+item.pokemon.id)" class="text-red-500 hover:underline text-xs">
									<i class="fa-solid fa-delete-left"></i>
									</button>
								</div>
							}
							<div class="mt-4 text-right">
								<a routerLink="/panier" class="bg-blue-600 px-3 py-1 text-sm rounded-lg hover:bg-blue-700 transition">
									Voir le panier
								</a>
							</div>
						} @else {
							<p class="text-sm text-gray-400">Votre panier est vide.</p>
						}
					</div>
				}


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
				<span (click)="toggleCartPopup()"
					class="px-3 relative cursor-pointer hover:text-gray-300 text-base float-right rounded mb-5 transition-all duration-300">
					<i class="w-8 fa-solid fa-cart-shopping p-2 bg-gray-800 rounded-full"></i>
					<span class="mx-1">Panier</span>
					<span class="absolute left-0 ml-8 -mt-2 text-xs bg-gray-700 font-medium px-2 shadow-lg rounded-full">
						{{ cartCount }}
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
	private pokemonService = inject(PokemonService);
	productCount: number = 0;
	favoritesCount: number = 0;
	cartCount: number = 0;
	cartItems = this.pokemonService.getCart();
	isCartPopupOpen = false;

	private router = inject(Router);
	private elementRef = inject(ElementRef);

	constructor() {
		this.router.events.subscribe((event) => {
		  if (event instanceof NavigationEnd) {
			this.activeRoute = event.urlAfterRedirects;
		  }
		});

		this.pokemonService.favorites$.subscribe(favorites => {
		  this.favoritesCount = favorites.length;
		});

		this.pokemonService.cart$.subscribe(cart => {
			this.cartItems = cart;
			this.cartCount = this.pokemonService.getNumberOfCartItems(); 
		});
	}

	toggleCartPopup() {
		this.isCartPopupOpen = !this.isCartPopupOpen;
	}

	removeFromCart(id: number) {
		this.pokemonService.removeFromCart(id);
		this.cartItems = this.pokemonService.getCart();
		this.cartCount = this.cartItems.length;
	}

	updateQuantity(pokemonId: number, quantity: number) {
		if (quantity < 0) {
		  return;
		}
	  
		if (quantity === 0) {
		  this.pokemonService.removeFromCart(pokemonId);
		} else {
		  this.pokemonService.getPokemons().subscribe(pokemons => {
			const pokemon = pokemons.find(p => p.id === pokemonId.toString());  
			if (pokemon) {
			  this.pokemonService.addToCart(pokemon, quantity);
			}
		  });
		}
	}  

	@HostListener('document:click', ['$event'])
	onDocumentClick(event: MouseEvent): void {
		const targetElement = event.target as HTMLElement;

		if (this.isCartPopupOpen && !this.elementRef.nativeElement.contains(targetElement)) {
			this.isCartPopupOpen = false;
		}
	}
}