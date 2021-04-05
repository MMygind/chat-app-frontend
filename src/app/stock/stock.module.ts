import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StockComponent} from './stock.component';
import {StockRoutingModule} from './stock-routing.module';


@NgModule({
  declarations: [StockComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StockRoutingModule
  ]
})
export class StockModule { }
