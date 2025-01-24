import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from "./footer/footer.component";
import { MainSectionComponent } from "./main-section/main-section.component";

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, MainSectionComponent, NavbarComponent, ProductsListComponent, FooterComponent],
	template: `
	<app-navbar></app-navbar>

	<section class="flex-1 bg-white">
		<app-main-section></app-main-section>
	</section>
	
	<app-products-list></app-products-list>

	<app-footer></app-footer>
	
    <router-outlet />
  `,
	styles: [],
})
export class AppComponent {
	title = 'Harry Potter Produits';
}
