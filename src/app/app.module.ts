import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EMPTY , from } from 'rxjs';
import { AppComponent } from './app.component';
import { first } from 'rxjs/operators';
import { TransactionComponentComponent } from './components/transaction-component/transaction-component.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
