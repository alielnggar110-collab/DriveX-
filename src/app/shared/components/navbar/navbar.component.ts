import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isDark = false; isLoggedIn = false; isMobileOpen = false; scrolled = false;

  constructor(private themeService: ThemeService, private authService: AuthService, private router: Router) {
    this.isDark = this.themeService.getIsDark();
    this.authService.isLoggedIn$.subscribe(logged => (this.isLoggedIn = logged));
  }

  @HostListener('window:scroll') onScroll(): void { this.scrolled = window.scrollY > 20; }
  toggleTheme(): void { this.themeService.toggleTheme(); this.isDark = !this.isDark; }
  toggleMobile(): void { this.isMobileOpen = !this.isMobileOpen; }
  closeMobile(): void { this.isMobileOpen = false; }
  logout(): void { this.authService.logout(); this.router.navigate(['/']); }
}