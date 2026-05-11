import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ToasterComponent } from './shared/components/toaster/toaster.component';
import { BookingDialogComponent } from './shared/components/booking-dialog/booking-dialog.component'; 
import { RouterOutlet, Router } from '@angular/router';
import { SpinnerComponent } from "./shared/components/spinner/spinner.component";
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, ToasterComponent, RouterOutlet, BookingDialogComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private spinnerService: SpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Show spinner during initial load
    this.spinnerService.show();
    
    // Hide spinner once router navigation is complete
    this.router.events.subscribe(() => {
      setTimeout(() => {
        this.spinnerService.hide();
      }, 500);
    });
  }
}