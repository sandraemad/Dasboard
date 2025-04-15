import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor() { }
  private isSliderVisible = new BehaviorSubject<boolean>(false);
  sliderVisibility$ = this.isSliderVisible.asObservable();

  toggleSlider() {
    this.isSliderVisible.next(!this.isSliderVisible.value);
  }
}
