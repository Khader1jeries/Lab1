import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },

  // 🛒 Products management and display
  { path: 'Products', component: CatalogComponent },
  { path: 'Products/showPopular', component: CatalogComponent },
  { path: 'Products/addProduct', component: AddProductComponent },
  { path: 'Products/updateProduct', component: UpdateProductComponent },
  { path: 'Products/:category', component: CatalogComponent },

  // 🔧 Admin
  { path: 'manage-products', component: ManageProductsComponent },
  { path: 'manage-users', component: ManageUsersComponent },

  // 👤 User
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },

  // 🛒 Cart (uncomment if implemented)
  // { path: 'cart', component: CartComponent },

  // 🔚 Not Found
  { path: '**', component: NotFoundComponent },
];
