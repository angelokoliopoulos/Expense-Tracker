import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionsListComponent } from './transactions/transactions-list/transactions-list.component';
import { TransactionEditComponent } from './transactions/transaction-edit/transaction-edit.component';
import { SettingsComponent } from './settings/settings.component';
import { ShopsComponent } from './shops/shops.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { LoginComponent } from './landing-page/login/login.component';
import { RegisterComponent } from './landing-page/register/register.component';
import { authenticationGuard } from './authentication/authentication.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing-page',
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
