import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class SocketService extends Socket{
  callBack: EventEmitter<any> = new EventEmitter();
  constructor(
  ) {
    super({ url: 'http://localhost:5000', options: {}});
    this.listen();
  } 
  listen = () =>{
    this.ioSocket.on('Notifications',(res: any) => this.callBack.emit(res));
  }
  emitEvent = (payload = {}) =>{
    this.ioSocket.emit('get-nots',payload);
  }
  
}