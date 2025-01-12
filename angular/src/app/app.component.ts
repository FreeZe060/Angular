import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from "./footer/footer.component";


@Component({
	selector: 'app-root',
	imports: [RouterOutlet, NavbarComponent, ProductsListComponent, FooterComponent],
	template: `
	<app-navbar></app-navbar>

	<section class="flex-1">
		<h1 class="px-5">Welcome to {{title}}!</h1>
		<app-products-list></app-products-list>
	</section>


	<app-footer></app-footer>
	
    <router-outlet />
  `,
	styles: [],
})
export class AppComponent {
	title = 'Harry Potter Produits';
}
