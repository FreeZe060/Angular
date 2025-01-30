import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SortByDate } from '../sort-by-date.pipe';
import { ProductService } from '../product-service.service';
import { FormsModule } from '@angular/forms';
import { SortByName } from '../sort-by-name.pipe';
import { SearchByTermPipe } from "../search-by-term.pipe";
import { SortByRarity } from "../sort-by-rarity.pipe";
import { TitleCasePipe } from '@angular/common';
import { PokemonService } from '../pokemon-service.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
    imports: [PokemonCardComponent, SortByDate, FormsModule, SortByName, SearchByTermPipe, SortByRarity, AsyncPipe, TitleCasePipe],
    selector: 'app-products-list',
    template: `
       <div class="container mx-auto p-4">
            <div class="text-center mb-6">
                <h1 class="text-4xl font-bold text-white">Pokémon List</h1>
                <div class="mt-4">
                <input
                    type="text"
                    [(ngModel)]="searchName"
                    (ngModelChange)="onSearchChange()"
                    class="px-4 py-2 rounded-full text-black w-full md:w-1/2 mx-auto"
                    placeholder="Search Pokémon by name"
                />
                </div>
                <div class="mt-4">
                <select
                    [(ngModel)]="selectedType"
                    (change)="onSearchChange()"
                    class="px-4 py-2 rounded-full text-black"
                >
                    <option value="">Select Type</option>
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="grass">Grass</option>
                </select>
                </div>
            </div>

                <div class="flex flex-wrap items-center gap-12">
                    @for(pokemon of pokemons; track pokemon){
                        <app-pokemon-card [pokemon]="pokemon"></app-pokemon-card>
                    }
                </div>
            </div>
    `,
    styles: ``,
    providers: []
})

export class ProductsListComponent {
    pokemons: any[] = [];
    searchName: string = '';
    selectedType: string = '';
    sortBy: string = '';

    private searchNameSubject = new Subject<string>();

    constructor(private pokemonService: PokemonService) { }

    ngOnInit() {
        this.loadPokemons();
        this.searchNameSubject.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(() => this.pokemonService.getPokemons(this.searchName, this.selectedType, this.sortBy))
        ).subscribe(data => {
            this.pokemons = data;
        });
    }

    onSearchChange() {
        this.searchNameSubject.next(this.searchName);
    }

    loadPokemons() {
        this.pokemonService.getPokemons(this.searchName, this.selectedType, this.sortBy)
            .subscribe(data => {
                this.pokemons = data;
            });
    }

    trackByFn(index: number, item: any) {
        return item.id;
    }
}