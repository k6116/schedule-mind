import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

import { ApiDataService } from './_shared/services/api-data.service';
import { CriteriaComponent } from './main/components/criteria/criteria.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEmployeesComponent } from './main/modals/add-employees/add-employees.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CriteriaComponent,
    AddEmployeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    ApiDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
