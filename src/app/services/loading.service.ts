import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  private requestCounter = 0;

  constructor() {}

  show() {
    this.requestCounter++;
    this.loadingSubject.next(true);
  }

  hide() {
    this.requestCounter--;
    if (this.requestCounter <= 0) {
      this.requestCounter = 0;
      this.loadingSubject.next(false);
    }
  }

  reset() {
    this.requestCounter = 0;
    this.loadingSubject.next(false);
  }
}
