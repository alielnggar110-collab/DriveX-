import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface DialogData {
  carName: string;
  pricePerDay: number;
  carId?: number;
  onBookingComplete?: () => void;
}

@Injectable({ providedIn: 'root' })
export class DialogService {
  private isOpen = new BehaviorSubject<boolean>(false);
  private dialogData = new BehaviorSubject<DialogData | null>(null);

  isOpen$ = this.isOpen.asObservable();
  dialogData$ = this.dialogData.asObservable();

  open(data: DialogData): void {
    this.dialogData.next(data);
    this.isOpen.next(true);
    document.body.classList.add('overflow-hidden');
  }

  close(): void {
    this.isOpen.next(false);
    document.body.classList.remove('overflow-hidden');
  }

  completeBooking(): void {
    const data = this.dialogData.value;
    if (data?.onBookingComplete) {
      data.onBookingComplete();
    }
    this.close();
  }
}