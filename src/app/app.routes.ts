import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { BrandsComponent } from './features/brands/brands.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { CartComponent } from './features/cart/cart.component';
import { ProductsComponent } from './features/products/products.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { productDetailsResolver } from './features/product-details/resolver/product-details.resolver';
import { authGuard } from './core/guard/auth-guard';
import { isLoginGuard } from './core/guard/is-login-guard';
import { ForgetPasswordComponent } from './core/auth/forget-password/forget-password.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { OrdersComponent } from './features/orders/orders.component';
import { OrderDetailsComponent } from './features/order-details/order-details.component';
import { orderdetailsGuard } from './core/guard/orderdetails-guard';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { UpdateUserComponent } from './features/update-user/update-user.component';

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
        component: LoginComponent,
        title: 'Login ',
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register ',
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
    canActivate: [authGuard],
    component: BlankLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home ',
      },
      {
        path: 'brands',
        component: BrandsComponent,
        title: 'Brands ',
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories ',
      },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Products ',
      },
      {
        path: 'product/:id',
        component: ProductDetailsComponent,
        resolve: {
          product: productDetailsResolver,
        },
        title: 'Product Details ',
      },
      {
        path: 'product/:id/:slug',
        component: ProductDetailsComponent,
        resolve: {
          product: productDetailsResolver,
        },
        title: 'Product Details ',
      },
      {
        path: 'cart',
        component: CartComponent,
        title: 'Shopping Cart ',
      },
      {
        path: 'changepassword',
        component: ChangePasswordComponent,
        title: 'Change Password ',
      },
      {
        path: 'updateuser',
        component: UpdateUserComponent,
        title: 'Edit user Data',
      },
      {
        path: 'checkout/:cart_id',
        component: CheckoutComponent,
        title: 'Checkout ',
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
        title: 'Shopping Wish List ',
      },
      {
        path: 'allorders',
        component: OrdersComponent,
        title: 'Shopping Orders ',
      },
      {
        path: 'orderdetails/:id',
        component: OrderDetailsComponent,
        title: 'Shopping Orders ',
        canActivate: [orderdetailsGuard],
      },
    ],
  },

  {
    path: '**',
    component: NotfoundComponent,
    title: 'Page Not Found ',
  },
];
