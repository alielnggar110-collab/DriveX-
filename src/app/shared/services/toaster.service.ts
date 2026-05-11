import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Toast { message: string; show: boolean; }

@Injectable({ providedIn: 'root' })
export class ToasterService {
  private toast = new Subject<Toast>();
  toast$ = this.toast.asObservable();
  show(message: string): void {
    this.toast.next({ message, show: true });
    setTimeout(() => { this.toast.next({ message: '', show: false }); }, 3000);
  }
}