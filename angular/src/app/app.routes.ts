import { Routes } from '@angular/router';
import { MainSectionComponent } from './main-section/main-section.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const routes: Routes = [
  { path: '', component: MainSectionComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'favoris', component: ProductsListComponent },
];
