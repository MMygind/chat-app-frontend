import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {StockMoney} from './stock-money.model';
import {SocketStock} from '../../app.module';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  stockMoney: StockMoney | undefined;

  constructor(private socket: SocketStock) { }

  sendStock(stock: StockMoney): void {
    this.socket.emit('stock', stock);
  }
}
