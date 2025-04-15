import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }
  private backgroundColor = new BehaviorSubject<string>('#3498db'); // اللون الافتراضي
  color$ = this.backgroundColor.asObservable();

  setColor(color: string): void {
    this.backgroundColor.next(color);
  }
}
