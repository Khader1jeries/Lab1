import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './manage-products/product-details/product-details.component';
import { CombinedCatalogComponent } from './combined-catalog/combined-catalog.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './profile/login/login.component';
import { RegisterComponent } from './profile/register/register.component';
import { UserDetailsComponent } from './profile/user-details/user-details.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { AddProductComponent } from './manage-products/add-product/add-product.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'manage-products', component: ManageProductsComponent },
  { path: 'catalog', component: CombinedCatalogComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }, // ניתוב ל-RegisterComponent
      { path: 'user-details', component: UserDetailsComponent },
    ],
  },
  { path: 'add-product', component: AddProductComponent },
  {
    path: 'edit-product/:id',
    loadComponent: () =>
      import('./manage-products/edit-product/edit-product.component').then(
        (m) => m.EditProductComponent
      ),
  },

  { path: '**', component: NotFoundComponent },
];
