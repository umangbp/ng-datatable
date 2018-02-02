import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DataTableModule } from './data-table/data-table.module';
import { MydataComponent } from './mydata/mydata.component';


@NgModule({
  declarations: [
    AppComponent,
    MydataComponent
  ],
  imports: [
    BrowserModule,
    DataTableModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
