import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ExcelService } from './services/excel.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule    
  ],
  providers: [ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
