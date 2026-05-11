import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isBrowser: boolean;
  private currentTheme = 'light'; // ✅ متغير عادي بدون localStorage

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // ✅ كل حاجة جوا الكونستركتور وبعد التحقق
    if (this.isBrowser) {
      this.currentTheme = localStorage.getItem('theme') || 'light';
      this.applyTheme(this.currentTheme);
    }
  }

  getTheme(): string {
    return this.currentTheme;
  }

  getIsDark(): boolean {
    return this.currentTheme === 'dark';
  }

  toggleTheme(): void {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setTheme(theme: string): void {
    this.currentTheme = theme;
    if (this.isBrowser) {
      localStorage.setItem('theme', theme);
      this.applyTheme(theme);
    }
  }

  private applyTheme(theme: string): void {
    if (this.isBrowser) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }
  }
}