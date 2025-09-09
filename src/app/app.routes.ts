import { Routes } from '@angular/router';
import { ForgetPasswordComponent } from './core/auth/forget-password/forget-password.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { authGuard } from './core/guard/auth-guard';
import { isLoginGuard } from './core/guard/is-login-guard';
import { orderdetailsGuard } from './core/guard/orderdetails-guard';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { HomeComponent } from './features/home/home.component';
import { productDetailsResolver } from './features/product-details/resolver/product-details.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [isLoginGuard],
    children: [
      {
        path: 'login',
        title: 'Login',
        component: LoginComponent,
      },
      {
        path: 'register',
        title: 'Register',
        component: RegisterComponent,
      },
      {
        path: 'forget-password',
        title: 'Forget Password',
        component: ForgetPasswordComponent,
      },
    ],
  },

  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        title: 'Home',
        component: HomeComponent,
      },
      {
        path: 'brands',
        title: 'Brands',
        loadComponent: () =>
          import('./features/brands/brands.component').then((c) => c.BrandsComponent),
      },
      {
        path: 'categories',
        title: 'Categories',
        loadComponent: () =>
          import('./features/categories/categories.component').then((c) => c.CategoriesComponent),
      },
      {
        path: 'products',
        title: 'Products',
        loadComponent: () =>
          import('./features/products/products.component').then((c) => c.ProductsComponent),
      },
      {
        path: 'product/:id/:slug?',
        title: 'Product Details',
        loadComponent: () =>
          import('./features/product-details/product-details.component').then(
            (c) => c.ProductDetailsComponent
          ),
        resolve: { product: productDetailsResolver },
      },
      {
        path: 'cart',
        title: 'Shopping Cart',
        loadComponent: () => import('./features/cart/cart.component').then((c) => c.CartComponent),
      },
      {
        path: 'changepassword',
        title: 'Change Password',
        loadComponent: () =>
          import('./features/change-password/change-password.component').then(
            (c) => c.ChangePasswordComponent
          ),
      },
      {
        path: 'updateuser',
        title: 'Edit User Data',
        loadComponent: () =>
          import('./features/update-user/update-user.component').then((c) => c.UpdateUserComponent),
      },
      {
        path: 'checkout/:cart_id',
        title: 'Checkout',
        loadComponent: () =>
          import('./features/checkout/checkout.component').then((c) => c.CheckoutComponent),
      },
      {
        path: 'wishlist',
        title: 'Shopping Wish List',
        loadComponent: () =>
          import('./features/wishlist/wishlist.component').then((c) => c.WishlistComponent),
      },
      {
        path: 'allorders',
        title: 'Shopping Orders',
        loadComponent: () =>
          import('./features/orders/orders.component').then((c) => c.OrdersComponent),
      },
      {
        path: 'orderdetails/:id',
        title: 'Shopping Orders',
        loadComponent: () =>
          import('./features/order-details/order-details.component').then(
            (c) => c.OrderDetailsComponent
          ),
        canActivate: [orderdetailsGuard],
      },
    ],
  },

  // Not Found
  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: () =>
      import('./features/notfound/notfound.component').then((c) => c.NotfoundComponent),
  },
];
