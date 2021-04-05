import {Component, OnDestroy, OnInit} from '@angular/core';
import {StockService} from './shared/stock.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {StockMoney} from './shared/stock-money.model';

@Component({
  selector: 'app-chat',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})

export class StockComponent implements OnInit, OnDestroy {
  stockFb = this.fb.group({
    stockName: [''],
    initValue: [],
    currValue: [],
    description: [''],
  });
  stockCreate: StockMoney | undefined;
  error: string | undefined;

  constructor(private stockService: StockService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  sendStock(): void {
    const stockDto: StockMoney = this.stockFb.value;
    this.stockService.sendStock(stockDto);
  }



}
