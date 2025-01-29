import { Routes } from '@angular/router';
import { MainSectionComponent } from './main-section/main-section.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutPageComponent } from './cart-page/cart-checkout.component';

export const routes: Routes = [
	{ path: '', component: MainSectionComponent },
	{ path: 'product/:id', component: ProductDetailComponent },
	{ path: 'favoris', component: ProductsListComponent },
	{ path: 'panier', component: CartPageComponent },
	{ path: 'checkout', component: CheckoutPageComponent }, 
];
