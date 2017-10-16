import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent }  from './app.component';
import {EmployeeComponent} from './employee/employee.component';
import {CustomPipe} from './employee/employee.pipe';
import {EmployeeCount} from './employee/employeecount.component';
import {LifeCycleHooks} from './employee/employeeHooks.component';
import {HomeComponent} from  './home/home.component';
import {PageNotFoundComponent} from './others/pageNotFound.component';
import {SingleEmployee} from './employee/single-employee.component';
import {EmployeeService} from './employee/employee.service';

const appRoutes:Routes=[
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'employees',
    component: EmployeeComponent
  },
  {
    path:'employees/:code',
    component: SingleEmployee
  },
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'**',
    component: PageNotFoundComponent
  },
]

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes)], //if you want # to get appended in url path automatically pass {useHash:true} to forRoot().
  declarations: [ AppComponent,EmployeeComponent, CustomPipe, EmployeeCount, LifeCycleHooks, HomeComponent, PageNotFoundComponent, SingleEmployee],
  bootstrap:    [ AppComponent ],
  providers:    [EmployeeService]
})
export class AppModule { }
