import {Component, OnDestroy, OnInit} from '@angular/core';
import {StockService} from './shared/stock.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {StockMoney} from './shared/stock-money.model';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

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
  stocks$: Observable<StockMoney[]> | undefined;
  unsubscribe$ = new Subject();
  selectedStock: StockMoney;

  constructor(private stockService: StockService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.stocks$ = this.stockService.listenForStocks();

    this.stockService.listenForStockDto();
  }

  ngOnDestroy(): void {
  }

  sendStock(): void {
    const stockDto: StockMoney = this.stockFb.value;
    this.stockService.sendStock(stockDto);
  }

  onSelect(stock: StockMoney): void {
    this.selectedStock = stock;
  }



}
