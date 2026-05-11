import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private isBrowser: boolean;
  
  // ✅ هنا عرفنا الـ Observable اللي الـ Component بيبحث عنه
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  show(): void {
    this.loadingSubject.next(true);
    if (this.isBrowser) {
      document.body.classList.add('spinner-active'); // لو بتضف كلاس على البدي
    }
  }

  hide(): void {
    this.loadingSubject.next(false);
    if (this.isBrowser) {
      document.body.classList.remove('spinner-active'); // لو بتحذف كلاس من البدي
    }
  }
}