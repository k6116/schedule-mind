import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

import { ApiDataService } from './_shared/services/api-data.service';
import { CriteriaComponent } from './main/components/criteria/criteria.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CriteriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
