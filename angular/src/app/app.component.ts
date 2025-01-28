import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from "./footer/footer.component";

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, NavbarComponent, FooterComponent],
	template: `
	<app-navbar></app-navbar>
	
	<div class="flex-1">
		<router-outlet />
	</div>

	<app-footer></app-footer>
  `,
	styles: [],
})

export class AppComponent {
	title = 'Harry Potter Produits';
}
