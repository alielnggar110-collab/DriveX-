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
    { image: 'https://picsum.photos/seed/hero-rental1/1920/800', title: 'Rent Your Perfect Car', subtitle: 'A diverse fleet of the finest global cars at the best prices' },
    { image: 'https://picsum.photos/seed/hero-rental2/1920/800', title: 'An Unforgettable Drive', subtitle: 'Fast booking and door-to-door delivery with 24/7 support' },
    { image: 'https://picsum.photos/seed/hero-rental3/1920/800', title: 'Transparent Pricing', subtitle: 'No hidden fees — what you see is exactly what you pay' }
  ];

  categories = [
    { name: 'Toyota', key: 'toyota', image: 'https://picsum.photos/seed/cat-toyota/400/280' },
    { name: 'BMW', key: 'bmw', image: 'https://picsum.photos/seed/cat-bmw/400/280' },
    { name: 'Chery', key: 'chery', image: 'https://picsum.photos/seed/cat-chery/400/280' },
    { name: 'Mercedes', key: 'mercedes', image: 'https://picsum.photos/seed/cat-mercedes/400/280' },
    { name: 'BYD', key: 'byd', image: 'https://picsum.photos/seed/cat-byd/400/280' }
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