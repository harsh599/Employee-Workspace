import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppEmployeeRoutingModule } from './app-employee-routing.module';
import { DisplayEmployeesComponent } from './display-employees/display-employees.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { AppCoreMaterialModule } from '../app-core-material/app-core-material.module';
import {  ReactiveFormsModule } from '@angular/forms';
import {NgBusyModule} from 'ng-busy';


@NgModule({
  declarations: [DisplayEmployeesComponent, CreateEmployeeComponent],
  imports: [
    CommonModule,
    AppEmployeeRoutingModule,
    AppMaterialModule,
    AppCoreMaterialModule,
    ReactiveFormsModule,
    NgBusyModule,

  ]
})
export class AppEmployeeModule { }
