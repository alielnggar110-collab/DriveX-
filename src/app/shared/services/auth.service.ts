import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isBrowser = false;
  // ✅ نعرفه بقيمة افتراضية وبدون localStorage
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  token: string | null = null;
  user: any = null;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // ✅ نقرأ من localStorage جوا الـ constructor وبعد التحقق
    if (this.isBrowser) {
      const isLogged = localStorage.getItem('isLoggedIn') === 'true';
      this.loggedIn.next(isLogged);

      this.token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    }
  }

  login(email: string, password: string): boolean {
    if (email && password && password.length >= 4) {
      // ✅ التحقق هنا قبل الكتابة
      if (this.isBrowser) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
      }
      this.loggedIn.next(true);
      return true;
    }
    return false;
  }

  saveUserData(token: string, user: any) {
    this.token = token;
    this.user = user;
    if (this.isBrowser) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  logout(): void {
    this.token = null;
    this.user = null;
    if (this.isBrowser) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    // ✅ مهم: الـ next بتاع الـ BehaviorSubject يخرج بره الـ if عشان يحدث اليوزر واجهته حتى لو على السيرفر
    this.loggedIn.next(false);
  }

  get isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }
}
