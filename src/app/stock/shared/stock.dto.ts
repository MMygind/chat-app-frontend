import {StockMoney} from './stock-money.model';

export interface StockDto {
    stocks: StockMoney[];
    stock: StockMoney;
}
