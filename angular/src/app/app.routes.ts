import { Routes } from '@angular/router';
import { MainSectionComponent } from './main-section/main-section.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutPageComponent } from './cart-page/cart-checkout.component';

export const routes: Routes = [
	{ path: '', component: MainSectionComponent },
	{ path: 'pokemon/:id', component: PokemonDetailComponent },
	{ path: 'favoris', component: ProductsListComponent },
	{ path: 'panier', component: CartPageComponent },
	{ path: 'checkout', component: CheckoutPageComponent }, 
];
