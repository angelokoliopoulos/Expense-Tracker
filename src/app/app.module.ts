import { NgModule } from '@angular/core';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './products/product/product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './products/products.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionModalComponent } from './modals/transaction-modal.component';
import { TransactionsListComponent } from './transactions/transactions-list/transactions-list.component';
import { TransactionItemComponent } from './transactions/transactions-list/transaction-item/transaction-item.component';
import { TransactionEditComponent } from './transactions/transaction-edit/transaction-edit.component';
import { environment } from 'src/environments/environment.development';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HeaderComponent,
    ProductComponent,
    TransactionsComponent,
    TransactionsListComponent,
    TransactionItemComponent,
    TransactionModalComponent,
    TransactionEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),

  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
