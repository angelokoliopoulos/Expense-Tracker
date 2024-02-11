import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionsListComponent } from './transactions/transactions-list/transactions-list.component';
import { TransactionEditComponent } from './transactions/transaction-edit/transaction-edit.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'transactions',component:TransactionsComponent,children:[
    {path:'', component:TransactionsListComponent},
    {path:':id/edit', component:TransactionEditComponent}
  ]},
  {path:'products',component:ProductsComponent},
  {path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
