import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExpiredService {
  public isExpired$ = new Subject<boolean>();
  showAlert():void{
    this.isExpired$.next(true);
  }
  hideAlert():void{
    this.isExpired$.next(false);
  }
}
