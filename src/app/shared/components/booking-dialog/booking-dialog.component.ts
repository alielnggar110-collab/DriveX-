import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DialogService, DialogData } from '../../services/dialog.service';
import { ToasterService } from '../../services/toaster.service';
import { CarsService } from '../../services/cars.service';
import { environment } from '../../../../environments/environments';

export interface BookingData {
  carName: string;
  pricePerDay: number;
}

@Component({
  selector: 'app-booking-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss']
})
export class BookingDialogComponent implements OnInit, OnDestroy {
  bookingForm: FormGroup;
  cardImagePreview: string | null = null;
  totalPrice = 0;
  currency = environment.currency;
  cardDigits = environment.cardDigits;
  
  data: DialogData = { carName: '', pricePerDay: 0 };
  private sub!: Subscription;

  constructor(
    private fb: FormBuilder,
    public dialogService: DialogService,
    private toasterService: ToasterService,
    private carsService: CarsService
  ) {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
      days: [1, [Validators.required, Validators.min(1)]],
      cardNumber: ['', [Validators.required, Validators.pattern(new RegExp(`^[0-9]{${environment.cardDigits}}$`))]],
      cardImage: [null, Validators.required]
    });

    this.bookingForm.get('days')?.valueChanges.subscribe(days => {
      this.totalPrice = days * this.data.pricePerDay;
    });
  }

  ngOnInit(): void {
    this.sub = this.dialogService.dialogData$.subscribe(res => {
      if (res) {
        this.data = res;
        this.totalPrice = res.pricePerDay;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.cardImagePreview = e.target?.result as string;
        this.bookingForm.get('cardImage')?.setValue(input.files![0].name);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onCardNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, '');
    value = value.slice(0, this.cardDigits);
    input.value = value;
    this.bookingForm.get('cardNumber')?.setValue(value);
  }

  get f() { return this.bookingForm.controls; }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      if (this.data.carId) {
        this.carsService.bookCar(this.data.carId).subscribe({
          next: (car) => {
            this.toasterService.show(`Booking confirmed for ${this.data.carName}!`);
            this.dialogService.completeBooking();
          },
          error: (err) => {
            this.toasterService.show('Booking failed: ' + err.message);
          }
        });
      } else {
        this.toasterService.show('Booking confirmed!');
        this.dialogService.completeBooking();
      }
    } else {
      this.bookingForm.markAllAsTouched();
    }
  }

  close(): void {
    this.dialogService.close();
  }
}