import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutinasService {
  private resetSource = new BehaviorSubject<boolean>(false);
  reset$ = this.resetSource.asObservable();

  triggerReset() {
    this.resetSource.next(true);
  }
  
  clearReset() {
    this.resetSource.next(false);
  }
}
