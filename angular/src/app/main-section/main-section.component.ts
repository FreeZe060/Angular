import { Component } from '@angular/core';
import { PokemonsListComponent } from '../pokemons-list/pokemons-list.component';

@Component({
	selector: 'app-main-section',
	imports: [PokemonsListComponent],
	template: `
    <div class="bg-black bottom-0">
		<div class="bg-white dark:bg-gray-800">
			<div class="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
				<h2 class="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
					<span class="block">
						Prêt à devenir le meilleur dresseur ?
					</span>
					<span class="block text-red-500">
						Collectionnez-les tous dès maintenant !
					</span>
				</h2>
				<p class="text-xl mt-4 max-w-md mx-auto text-gray-400">
					Plongez dans l'univers Pokémon et constituez votre équipe ultime avec des Pokémon légendaires, des attaques puissantes et des aventures épiques.
				</p>
				<div class="lg:mt-0 lg:flex-shrink-0">
					<div class="mt-12 inline-flex rounded-md shadow">
						<button type="button" class="py-4 px-6 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
							Commencez à capturer
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>


	<app-pokemons-list></app-pokemons-list>

  	`,
	styles: ``
})
export class MainSectionComponent {

}
