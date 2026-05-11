import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CarsService, Car } from '../../shared/services/cars.service';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  allCars: Car[] = [];
  filteredCars: Car[] = [];
  selectedCategory = 'all';
  categories = [
    { key: 'all', name: 'All' },
    { key: 'toyota', name: 'Toyota' },
    { key: 'bmw', name: 'BMW' },
    { key: 'chery', name: 'Chery' },
    { key: 'mercedes', name: 'Mercedes' },
    { key: 'byd', name: 'BYD' }
  ];

  constructor(private carsService: CarsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.carsService.getCars().subscribe(cars => {
      this.allCars = cars;
      this.route.queryParams.subscribe(params => {
        const cat = params['category'];
        if (cat && this.categories.some(c => c.key === cat)) this.selectedCategory = cat;
        this.filterCars();
      });
    });
  }

  filterCars(): void {
    this.filteredCars = this.selectedCategory === 'all' ? this.allCars : this.allCars.filter(c => c.category === this.selectedCategory);
  }

  selectCategory(key: string): void { this.selectedCategory = key; this.filterCars(); }
  truncate(text: string, len: number): string { return text.length > len ? text.substring(0, len) + '...' : text; }
}