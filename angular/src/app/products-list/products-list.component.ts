import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SortByDate } from '../sort-by-date.pipe';
import { ProductService } from '../product-service.service';
import { FormsModule } from '@angular/forms';
import { SortByName } from '../sort-by-name.pipe';
import { SearchByTermPipe } from "../search-by-term.pipe";
import { SortByRarity } from "../sort-by-rarity.pipe";

@Component({
    selector: 'app-products-list',
    imports: [ProductCardComponent, SortByDate, FormsModule, SortByName, SearchByTermPipe, SortByRarity],
    template: `
        <div class="px-5 py-8 bg-gray-100 min-h-screen">

            <div class="px-5 flex gap-16 items-center justify-center bg-white shadow-xl rounded-lg p-4">
                <div class="flex items-center bg-gray-100 p-2 rounded-lg">
                    <input
                        type="text"
                        [(ngModel)]="searchTerm"
                        placeholder="Chercher des produits..."
                        class="outline-none bg-transparent px-4 text-gray-700"
                    />
                    <button class="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        Chercher
                    </button>
                </div>
                
                <h2 class="text-xl font-semibold text-center text-gray-800">{{countFav}} Favoris</h2>

                <div>
                    <label class="text-gray-600 font-medium">Filtrer par</label>
                    <select
                        [(ngModel)]="sortSelected"
                        class="ml-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-500">
                        @for (so of sortOpt; track so) {
                            <option [value]="$index">{{so}}</option>
                        }
                        </select>
                </div>
            </div>

            <div class="flex justify-center items-center p-5 gap-5 flex-wrap">
                @for (p of (products | searchByTerm: searchTerm | sortByDate: sortOpt[sortSelected] | sortByName: sortOpt[sortSelected] | sortByRarity:sortOpt[sortSelected] ); track p.id) {
                    <app-product-card [product]="p" (addItemEvent)="addItem($event)"></app-product-card>
                }
            </div>
        </div>

    `,
    styles: ``
})

export class ProductsListComponent {
    sortOpt = ['A-Z', 'Z-A', '+ Récent', '- Récent','↑ Rareté', '↓ Rareté'];
    sortSelected = 0;
    countFav = 0;
    searchTerm = '';
    productService = inject(ProductService);
    products = this.productService.getProducts();

    addItem(item: number) {
        this.countFav += item;
    }

}
