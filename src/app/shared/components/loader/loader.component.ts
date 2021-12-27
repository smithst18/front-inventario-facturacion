import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  template: `
  <div class="overlay" *ngIf="isLoading$ | async">
    <div class="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  `,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  isLoading$ = this.loaderService.isLoading$;
  constructor(private loaderService:LoaderService) { }

}
