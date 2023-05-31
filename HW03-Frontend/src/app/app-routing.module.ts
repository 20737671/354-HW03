import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListingComponent } from './listing/listing.component';
import { AddProductComponent } from './add-product/add-product.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Define the login route
  { path: 'register', component: RegisterComponent },
  { path: 'listing', component: ListingComponent },
  { path: 'add-product', component: AddProductComponent },
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  // Other route configurations
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
