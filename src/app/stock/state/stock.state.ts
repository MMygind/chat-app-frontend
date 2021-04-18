import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {StockDto} from '../shared/stock.dto';
import {StockMoney} from '../shared/stock-money.model';
import {ListenForStocks, UpdateStocks} from './stock.actions';
import {Subscription} from 'rxjs';
import {StockService} from '../shared/stock.service';

export interface StockStateModel {
  stocks: StockMoney[];
  stock: StockMoney | undefined;
}

@State<StockStateModel>({
  name: 'stock',
  defaults: {
    stocks: [],
    stock: undefined,
  }
})
@Injectable()
export class StockState {
  private stocksUnsub: Subscription | undefined;

  constructor(private stockService: StockService) {
  }

  @Selector()
  static stocks(state: StockStateModel): StockMoney[] {
    return state.stocks;
  }

  @Action(ListenForStocks)
  getStocks(ctx: StateContext<StockStateModel>): void {
    this.stocksUnsub = this.stockService.listenForStocks()
      .subscribe(stocks => {
        ctx.dispatch(new UpdateStocks(stocks));
      });
  }


  @Action(UpdateStocks)
  updateStocks(ctx: StateContext<StockStateModel>, us: UpdateStocks): void {
    const state = ctx.getState();
    const newState: StockStateModel = {
      ...state,
      stocks: us.stocks
    };
    ctx.setState(newState);
  }
}
