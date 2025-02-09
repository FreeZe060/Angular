import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';


@Component({
  selector: 'app-error-page',
  template: `
    <div class="flex flex-col items-center justify-center h-screen bg-gray-900 text-white animate-fadeIn">

      <div class="max-w-sm animate-bounce">
        <img src="https://i.imgur.com/qIufhof.png" alt="Erreur" class="w-full">
      </div>

      <h1 class="text-6xl font-extrabold text-red-500 mt-6 animate-fadeInUp">Oops!</h1>
      <p class="text-xl text-gray-300 mt-4 animate-fadeInUp delay-200">La page demandée est introuvable.</p>
      <p class="text-md text-gray-400 mt-2 animate-fadeInUp delay-400">
        Il semble que cette page n'existe pas ou a été supprimée.
      </p>

      <button 
        (click)="navigateHome()" 
        class="mt-6 px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg shadow-md animate-pulse cursor-custom relative"
      >
        Retourner à l'accueil
      </button>
      
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn { animation: fadeIn 1s ease-out; }
    .animate-fadeInUp { animation: fadeIn 1s ease-out; }

  `]
})
export class ErrorPageComponent {
  constructor(private router: Router) {}

  navigateHome() {
    this.router.navigate(['/']);
  }
}
