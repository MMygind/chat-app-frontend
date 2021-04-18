import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StockComponent} from './stock.component';
import {StockRoutingModule} from './stock-routing.module';
import {StockState} from './state/stock.state';
import {NgxsModule} from '@ngxs/store';


@NgModule({
  declarations: [StockComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StockRoutingModule,
    NgxsModule.forFeature([StockState])
  ]
})
export class StockModule { }
