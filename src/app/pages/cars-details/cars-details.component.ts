import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CarsService, Car } from '../../shared/services/cars.service';
import { AuthService } from '../../shared/services/auth.service';
import { DialogService } from '../../shared/services/dialog.service';
import { environment } from '../../../environments/environments';


@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cars-details.component.html',
  styleUrls: ['./cars-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  car: Car | undefined;
  currency = environment.currency;
private isBrowser = false;
  constructor(
    private carsService: CarsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carsService.getCarById(id).subscribe(car => {
      if (!car) this.router.navigate(['/cars']);
      this.car = car;
    });
  }

   book(): void {
    if (!this.isBrowser) return;
    
     if (!this.authService.isLoggedIn) { 
      this.router.navigate(['/login']); 
      return; 
    }
    
    if (!this.car) return;
    
    this.dialogService.open({ 
      carName: this.car.name, 
      pricePerDay: this.car.price,
      carId: this.car.id,
      onBookingComplete: () => {
          this.router.navigate(['/cars']);
      }
    });
  }

  goBack(): void { 
    this.router.navigate(['/cars']); 
  }
}