import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {StockMoney} from './stock-money.model';
import {SocketStock} from '../../app.module';
import {Observable} from 'rxjs';
import {StockDto} from './stock.dto';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  stockMoney: StockMoney | undefined;

  constructor(private socket: SocketStock) { }

  sendStock(stock: StockMoney): void {
    this.socket.emit('stock', stock);
  }

  updateStock(id: string, updateStock: StockMoney): void {
    this.socket.emit('updateStock', updateStock);
  }

  listenForStocks(): Observable<StockMoney[]> {
    return this.socket.fromEvent<StockMoney[]>('stocks');
  }

  listenForStockDto(): void {
    this.socket.emit('welcomeStock');
  }
}
