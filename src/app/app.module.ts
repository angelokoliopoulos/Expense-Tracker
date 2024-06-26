import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionModalComponent } from './modals/transaction-modal/transaction-modal.component';
import { TransactionsListComponent } from './transactions/transactions-list/transactions-list.component';
import { TransactionEditComponent } from './transactions/transaction-edit/transaction-edit.component';
import { ProductModalComponent } from './modals/product-modal/product-modal.component';
import { NgbdSortableHeader } from './shared/sortable.directive';
import { SettingsComponent } from './settings/settings.component';
import { TransactionProductsModalComponent } from './modals/transactionProducts-modal/transactionProducts-modal.component';
import { ShopsComponent } from './shops/shops.component';
import { ShopModalComponent } from './modals/shop-modal/shop-modal.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import { AnalyticsComponent } from './analytics/analytics.component';
import { TransactionChartComponent } from './transaction-chart/transaction-chart.component';
import { ChartDateModalComponent } from './modals/chart-date-modal/chart-date-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    SettingsComponent,
    TransactionsComponent,
    TransactionsListComponent,
    TransactionModalComponent,
    ChartDateModalComponent,
    ShopModalComponent,
    TransactionProductsModalComponent,
    ProductModalComponent,
    TransactionEditComponent,
    ShopsComponent,
    AnalyticsComponent,
    NgbdSortableHeader,
    LoadingSpinnerComponent,
    TransactionChartComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    NgbTypeaheadModule,
    BaseChartDirective
  ],
  providers: [provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent]
})
export class AppModule { }
