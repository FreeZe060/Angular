import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, ProductsListComponent],
	template: `
    <h1 class="px-5">Welcome to {{title}}!</h1>
	
	<app-products-list></app-products-list>
	
    <router-outlet />
  `,
	styles: [],
})
export class AppComponent {
	title = 'Harry Potter Produits';
}
