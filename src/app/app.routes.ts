import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CombinedCatalogComponent } from './combined-catalog/combined-catalog.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './profile/login/login.component';
import { RegisterComponent } from './profile/register/register.component';
import { UserDetailsComponent } from './profile/user-details/user-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'catalog', component: CombinedCatalogComponent },
  { path: 'about', component: AboutComponent },
  { 
    path: 'profile', 
    component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }, // ניתוב ל-RegisterComponent
      { path: 'user-details', component: UserDetailsComponent }
    ]
  },
  { path: '**', component: NotFoundComponent },
];