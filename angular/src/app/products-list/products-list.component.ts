import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SortByDate } from '../sort-by-date.pipe';
import { ProductService } from '../product-service.service';
import { FormsModule } from '@angular/forms';
import { SortByName } from '../sort-by-name.pipe';
import { SearchByTermPipe } from "../search-by-term.pipe";

@Component({
    selector: 'app-products-list',
    imports: [ProductCardComponent, SortByDate, FormsModule, SortByName, SearchByTermPipe],
    template: `
        <h2 class="px-5">{{countFav}} Favorites</h2>

        <div class="px-5 flex gap-20">
            <div>
                <input type="text" [(ngModel)]="searchTerm" placeholder="Chercher Produits...">
                <button>Chercher</button>
            </div>
            <div>
                <label>Filtrer par </label>
                <select [(ngModel)]="sortSelected">
                    @for (so of sortOpt; track so) {
                        <option [value]="$index">{{so}}</option>
                    }
                </select>
            </div>
	    </div>
        <div class="flex center p-5 gap-5 flex-wrap">
            @for (p of (products | searchByTerm: searchTerm | sortByDate: sortOpt[sortSelected] | sortByName: sortOpt[sortSelected]); track p.id) {
                <app-product-card [product]=p (addItemEvent)="addItem($event)" />
            }
	    </div>
    `,
    styles: ``
})

export class ProductsListComponent {
    sortOpt = ['A-Z', 'Z-A', '+ recent', '- recent'];
    sortSelected = 0;
    countFav = 0;
    searchTerm = '';
    productService = inject(ProductService);
    products = this.productService.getProducts();

    addItem(item: number) {
        this.countFav += item;
    }
}
