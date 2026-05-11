import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SpinnerService } from './spinner.service';

export interface Car {
  id: number;
  name: string;
  category: string;
  price: number;
  count: number;
  image: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class CarsService {
  private cars: Car[] = [
    {
      id: 1,
      name: 'Toyota Corolla 2024',
      category: 'toyota',
      price: 1200,
      count: 5,
      image: 'https://picsum.photos/seed/toyota-corolla24/600/400',
      description:
        'An economical and practical sedan from Toyota, known for its fuel efficiency and driving comfort. Equipped with a 1.6L engine and advanced safety technologies.',
    },
    {
      id: 2,
      name: 'Toyota Camry 2024',
      category: 'toyota',
      price: 1800,
      count: 3,
      image: 'https://picsum.photos/seed/toyota-camry24/600/400',
      description:
        'The luxurious Toyota Camry sedan combines elegance with high performance. Powered by a 2.5L engine producing 203 horsepower.',
    },
    {
      id: 3,
      name: 'Toyota Land Cruiser 2024',
      category: 'toyota',
      price: 4000,
      count: 2,
      image: 'https://picsum.photos/seed/landcruiser24/600/400',
      description:
        'The legendary king of off-road, Toyota Land Cruiser with a 3.5L twin-turbo V6 engine. Advanced four-wheel drive system.',
    },
    {
      id: 4,
      name: 'BMW 320i 2024',
      category: 'bmw',
      price: 2500,
      count: 3,
      image: 'https://picsum.photos/seed/bmw-320i24/600/400',
      description:
        'BMW 3 Series, the luxury sports sedan. 2.0L turbo engine producing 184 horsepower with sport seats.',
    },
    {
      id: 5,
      name: 'BMW X5 2024',
      category: 'bmw',
      price: 4500,
      count: 2,
      image: 'https://picsum.photos/seed/bmw-x5-24/600/400',
      description:
        'The luxury SUV from BMW. 3.0L inline-six turbo engine producing 335 horsepower with xDrive intelligent all-wheel drive.',
    },
    {
      id: 6,
      name: 'BMW 520i 2024',
      category: 'bmw',
      price: 3000,
      count: 2,
      image: 'https://picsum.photos/seed/bmw-520i-24/600/400',
      description:
        'The executive sedan from BMW. 2.0L turbo engine producing 208 horsepower with iDrive 8 system.',
    },
    {
      id: 7,
      name: 'Chery Tiggo 4 Pro 2024',
      category: 'chery',
      price: 1000,
      count: 6,
      image: 'https://picsum.photos/seed/chery-tiggo4p/600/400',
      description:
        'An economical crossover from Chery, ideal for city driving. 1.5L turbo engine with CVT transmission.',
    },
    {
      id: 8,
      name: 'Chery Tiggo 8 Pro 2024',
      category: 'chery',
      price: 1500,
      count: 4,
      image: 'https://picsum.photos/seed/chery-tiggo8p/600/400',
      description:
        'A spacious family SUV from Chery with 7 seats. 1.6L turbo engine producing 197 horsepower.',
    },
    {
      id: 9,
      name: 'Mercedes C200 2024',
      category: 'mercedes',
      price: 3500,
      count: 2,
      image: 'https://picsum.photos/seed/merc-c200-24/600/400',
      description:
        'The luxury sedan from Mercedes-Benz. 1.5L mild-hybrid turbo engine with EQ Boost system producing 204 horsepower.',
    },
    {
      id: 10,
      name: 'Mercedes E200 2024',
      category: 'mercedes',
      price: 4500,
      count: 2,
      image: 'https://picsum.photos/seed/merc-e200-24/600/400',
      description:
        'The executive sedan from Mercedes. 2.0L turbo engine producing 197 horsepower with 9G-Tronic transmission.',
    },
    {
      id: 11,
      name: 'Mercedes S500 2024',
      category: 'mercedes',
      price: 5000,
      count: 1,
      image: 'https://picsum.photos/seed/merc-s500-24/600/400',
      description:
        'The pinnacle of luxury from Mercedes-Benz. 3.0L inline-six turbo with mild-hybrid system producing 429 horsepower.',
    },
    {
      id: 12,
      name: 'BYD Han 2024',
      category: 'byd',
      price: 2000,
      count: 3,
      image: 'https://picsum.photos/seed/byd-han-24/600/400',
      description:
        'A luxury electric sedan from BYD. Blade Battery with a range of up to 550 km and a unique rotating screen.',
    },
    {
      id: 13,
      name: 'BYD Seal 2024',
      category: 'byd',
      price: 2500,
      count: 3,
      image: 'https://picsum.photos/seed/byd-seal-24/600/400',
      description:
        'The electric sports car from BYD. Blade Battery with a range of up to 700 km. 0-100 km/h in 5.9 seconds.',
    },
  ];

  constructor(private spinner: SpinnerService) {}

  getCars(): Observable<Car[]> {
    this.spinner.show();
    return new Observable<Car[]>((observer) => {
      setTimeout(() => {
        this.spinner.hide();
        observer.next(this.cars);
        observer.complete();
      }, 300); // Simulate loading delay
    });
  }

  getCarById(id: number): Observable<Car | undefined> {
    this.spinner.show();
    return new Observable<Car | undefined>((observer) => {
      setTimeout(() => {
        this.spinner.hide();
        observer.next(this.cars.find((c) => c.id === id));
        observer.complete();
      }, 300); // Simulate loading delay
    });
  }

  updateCarCount(id: number, count: number): Observable<Car | undefined> {
    this.spinner.show();
    return new Observable<Car | undefined>((observer) => {
      setTimeout(() => {
        const carIndex = this.cars.findIndex((c) => c.id === id);
        if (carIndex !== -1) {
          this.cars[carIndex].count = count;
          this.spinner.hide();
          observer.next(this.cars[carIndex]);
          observer.complete();
        } else {
          this.spinner.hide();
          observer.error(new Error('Car not found'));
        }
      }, 300); // Simulate API delay
    });
  }

  bookCar(id: number): Observable<Car | undefined> {
    this.spinner.show();
    return new Observable<Car | undefined>((observer) => {
      setTimeout(() => {
        const carIndex = this.cars.findIndex((c) => c.id === id);
        if (carIndex !== -1) {
          const car = this.cars[carIndex];
          if (car.count > 0) {
            car.count -= 1; // Decrease available cars
            this.spinner.hide();
            observer.next(car);
            observer.complete();
          } else {
            this.spinner.hide();
            observer.error(new Error('No cars available'));
          }
        } else {
          this.spinner.hide();
          observer.error(new Error('Car not found'));
        }
      }, 300); // Simulate API delay
    });
  }
}
