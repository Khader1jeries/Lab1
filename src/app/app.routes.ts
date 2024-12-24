import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CombinedCatalogComponent } from './combined-catalog/combined-catalog.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'catalog', component: CombinedCatalogComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent },
];
