import {StockMoney} from '../shared/stock-money.model';

export class ListenForStocks {
  static readonly type = '[Stock] Listen For Stocks';
}

export class UpdateStocks {
  constructor(public stocks: StockMoney[]) {}

  static readonly type = '[Stock] Update Stocks';
}
