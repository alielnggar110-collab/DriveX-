import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarsService, Car } from '../../shared/services/cars.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  featuredCars: Car[] = [];
  currentSlide = 0;
  slideInterval: any;

  slides = [
    { image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&h=800&fit=crop&q=80', title: 'Rent Your Perfect Car', subtitle: 'A diverse fleet of the finest global cars at the best prices' },
    { image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=800&fit=crop&q=80', title: 'An Unforgettable Drive', subtitle: 'Fast booking and door-to-door delivery with 24/7 support' },
    { image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1920&h=800&fit=crop&q=80', title: 'Transparent Pricing', subtitle: 'No hidden fees — what you see is exactly what you pay' }
  ];

  categories = [
    { name: 'Toyota', key: 'toyota', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=280&fit=crop&q=80' },
    { name: 'BMW', key: 'bmw', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=280&fit=crop&q=80' },
    { name: 'Chery', key: 'chery', image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=400&h=280&fit=crop&q=80' },
    { name: 'Mercedes', key: 'mercedes', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=280&fit=crop&q=80' },
    { name: 'BYD', key: 'byd', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=280&fit=crop&q=80' }
  ];

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {
    this.startSlider();
    this.carsService.getCars().subscribe(cars => { this.featuredCars = cars.slice(0, 6); });
  }

  ngOnDestroy(): void { if (this.slideInterval) clearInterval(this.slideInterval); }

  startSlider(): void {
    this.slideInterval = setInterval(() => { this.currentSlide = (this.currentSlide + 1) % this.slides.length; }, 5000);
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    if (this.slideInterval) clearInterval(this.slideInterval);
    this.startSlider();
  }

  truncate(text: string, len: number): string {
    return text.length > len ? text.substring(0, len) + '...' : text;
  }
}