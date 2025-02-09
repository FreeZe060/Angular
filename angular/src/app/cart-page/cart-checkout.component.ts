import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
	selector: 'app-checkout-page',
	imports: [RouterLink, CommonModule],
	template: `
    <section class="min-h-screen flex justify-center items-center bg-gray-100">
      <div class="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md">
        <form (submit)="onSubmit($event)" class="space-y-6">
          <h2 class="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <i class="fas fa-shipping-fast"></i>
            Expedition Information
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label for="f-name" class="block text-sm font-medium text-gray-700">Prenom</label>
              <input type="text" id="f-name" name="f-name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
            </div>
            <div>
              <label for="l-name" class="block text-sm font-medium text-gray-700">Nom</label>
              <input type="text" id="l-name" name="l-name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
            </div>
          </div>

          <div>
            <label for="address" class="block text-sm font-medium text-gray-700">Rue</label>
            <input type="text" id="address" name="address" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label for="city" class="block text-sm font-medium text-gray-700">Ville</label>
              <input type="text" id="city" name="city" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
            </div>
            <div>
              <label for="state" class="block text-sm font-medium text-gray-700">Département</label>
              <input type="text" id="state" name="state" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
            </div>
            <div>
              <label for="zip" class="block text-sm font-medium text-gray-700">Code Postale</label>
              <input type="text" id="zip" name="zip" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
            </div>
          </div>

          <h2 class="text-2xl font-semibold text-gray-900 flex items-center gap-2 mt-10">
				<i class="far fa-credit-card"></i>
				Paiement Information
          </h2>

          <div>
            <label for="card-num" class="block text-sm font-medium text-gray-700">No. de Carte Bleue</label>
            <input 
				type="text" 
				id="card-num" 
				name="card-num" 
				class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
				required
				placeholder="1234 5678 9101 1121"
				title="Please enter a valid credit card number (e.g., 1234 5678 9101 1121)"
				maxlength="19" 
				(input)="formatCardNumber($event)">
          </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
					<label for="expire" class="block text-sm font-medium text-gray-700">Date d'expiration</label>
					<input 
						type="text" 
						id="expire" 
						name="expire" 
						class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
						required
						placeholder="MM/YY"
						title="Please enter a valid expiration date in MM/YY format"
						maxlength="5"
						(input)="formatExpirationDate($event)">
              </div>

              <div>
                <label for="security" class="block text-sm font-medium text-gray-700">CCV</label>
                <input 
                  type="text" 
                  id="security" 
                  name="security" 
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
                  required
                  placeholder="123"
                  title="Please enter a valid 3-digit CCV"
                  maxlength="3"
                  (input)="validateCCV($event)">
              </div>
            </div>


            <div class="flex justify-between">
                <button type="submit" class="w-full sm:w-auto py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm focus:outline-none hover:bg-indigo-700 transition">Acheter</button>
                <button type="button" class="w-full sm:w-auto py-2 px-4 bg-gray-300 text-gray-800 rounded-md shadow-sm focus:outline-none hover:bg-gray-400 transition">
                  <a routerLink="/panier"
                    class="w-full sm:w-auto py-2 px-4 bg-gray-300 text-gray-800 text-center rounded-md shadow-sm focus:outline-none hover:bg-gray-400 transition">
                    Retour au panier
                  </a>
                </button>
            </div>
        </form>
      </div>
    </section>
  `,
	styles: []
})

export class CheckoutPageComponent {

	constructor(private router: Router) { }

	formatCardNumber(event: any): void {
		let value = event.target.value.replace(/\D/g, '');

		value = value.replace(/(\d{4})(?=\d)/g, '$1 ');

		event.target.value = value;

		if (value.replace(/\s/g, '').length === 16) {
			event.target.setCustomValidity('');
		} else {
			event.target.setCustomValidity('Please enter a valid 16-digit card number (e.g., 1234 5678 9101 1121)');
		}
	}

	formatExpirationDate(event: any): void {
		let value = event.target.value.replace(/\D/g, '');

		if (value.length > 2) {
			value = value.replace(/(\d{2})(?=\d)/, '$1/');
		}

		event.target.value = value;

		if (/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
			event.target.setCustomValidity('');
		} else {
			event.target.setCustomValidity('Please enter a valid expiration date in MM/YY format');
		}
	}

	validateCCV(event: any): void {
		let value = event.target.value.replace(/\D/g, '');
		event.target.value = value;

		if (value.length === 3) {
			event.target.setCustomValidity('');
		} else {
			event.target.setCustomValidity('Please enter a valid 3-digit CCV');
		}
	}

  onSubmit(event: Event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Afficher une alerte SweetAlert2
    Swal.fire({
      title: 'Succès !',
      text: 'Votre formulaire a été soumis avec succès.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      // Redirection vers la page d'accueil après la confirmation
      this.router.navigate(['/']);
    });
  }

}
