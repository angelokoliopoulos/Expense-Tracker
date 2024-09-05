import { Routes } from '@angular/router';
import { AnalyticsComponent } from './app/analytics/analytics.component';
import { authenticationGuard } from './app/authentication/authentication.guard';
import { HomeComponent } from './app/home/home.component';
import { LandingPageComponent } from './app/landing-page/landing-page.component';
import { LoginComponent } from './app/landing-page/login/login.component';
import { RegisterComponent } from './app/landing-page/register/register.component';
import { ProductsComponent } from './app/products/products.component';
import { SettingsComponent } from './app/settings/settings.component';
import { ShopsComponent } from './app/shops/shops.component';
import { TransactionEditComponent } from './app/transactions/transaction-edit/transaction-edit.component';
import { TransactionsListComponent } from './app/transactions/transactions-list/transactions-list.component';
import { TransactionsComponent } from './app/transactions/transactions.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'landing-page',
    component: LandingPageComponent,

    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authenticationGuard],
    canActivateChild: [authenticationGuard],
    children: [
      {
        path: 'transactions',
        component: TransactionsComponent,
        children: [
          { path: '', component: TransactionsListComponent },
          { path: ':id/edit', component: TransactionEditComponent },
        ],
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'shops',
        component: ShopsComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
      },
    ],
  },
];
