import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Static pages: prerendered for SEO and faster load
  { path: '', renderMode: RenderMode.Server }, // Root → home
  { path: 'home', renderMode: RenderMode.Prerender }, // Home page
  { path: 'brands', renderMode: RenderMode.Prerender }, // Brands list
  { path: 'categories', renderMode: RenderMode.Prerender }, // Categories list
  { path: 'products', renderMode: RenderMode.Prerender }, // Products listing

  // Dynamic pages: SSR for server-side rendering
  { path: 'product/:id/:slug?', renderMode: RenderMode.Server }, // Product details

  // Auth-related pages (optional prerender)
  { path: 'login', renderMode: RenderMode.Prerender },
  { path: 'register', renderMode: RenderMode.Prerender },
  { path: 'forget-password', renderMode: RenderMode.Prerender },

  // Protected pages (SSR to ensure auth check)
  { path: 'cart', renderMode: RenderMode.Server },
  { path: 'checkout/:cart_id', renderMode: RenderMode.Server },
  { path: 'wishlist', renderMode: RenderMode.Server },
  { path: 'allorders', renderMode: RenderMode.Server },
  { path: 'orderdetails/:id', renderMode: RenderMode.Server },

  // Fallback for 404 or any other route
  { path: '**', renderMode: RenderMode.Server },
];
