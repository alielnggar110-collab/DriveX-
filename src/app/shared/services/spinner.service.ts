import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private isBrowser: boolean;
  
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  show(): void {
    this.loadingSubject.next(true);
    if (this.isBrowser) {
      document.body.classList.add('spinner-active');
    }
  }

  hide(): void {
    this.loadingSubject.next(false);
    if (this.isBrowser) {
      document.body.classList.remove('spinner-active');
    }
  }
}