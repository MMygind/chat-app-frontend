import {Component, OnDestroy, OnInit} from '@angular/core';
import {StockService} from './shared/stock.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {StockMoney} from './shared/stock-money.model';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Select, Store} from '@ngxs/store';
import {StockState} from './state/stock.state';
import {ListenForStocks} from './state/stock.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})

export class StockComponent implements OnInit, OnDestroy {
  @Select(StockState.stocks) stockClients$: Observable<StockMoney[]> | undefined;

  stockFb = this.fb.group({
    stockName: [''],
    initValue: [],
    currValue: [],
    description: [''],
  });

  updateFc = this.fb.group({
    value: [],
  });

  stockCreate: StockMoney | undefined;
  error: string | undefined;
  stocks$: Observable<StockMoney[]> | undefined;
  unsubscribe$ = new Subject();
  selectedStock: StockMoney;

  constructor(private stockService: StockService, private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new ListenForStocks());
    this.stocks$ = this.stockService.listenForStocks();

    this.stockService.listenForStockDto();
  }

  ngOnDestroy(): void {
  }

  sendStock(): void {
    const stockDto: StockMoney = this.stockFb.value;
    this.stockService.sendStock(stockDto);
  }

  updateStock(): void {
    if (this.selectedStock)
    {
      this.stockService.updateStock(this.selectedStock.id, {
        id: this.selectedStock.id,
        currValue: this.updateFc.value.value,
        description: this.selectedStock.description,
        initValue: this.selectedStock.initValue,
        stockName: this.selectedStock.stockName
      });
    }
  }

  onSelect(stock: StockMoney): void {
    this.selectedStock = stock;
  }



}
