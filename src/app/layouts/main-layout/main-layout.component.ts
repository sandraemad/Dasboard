import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CustomComponent } from "../custom/custom.component";
import { BarComponent } from "../bar/bar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, CustomComponent, BarComponent,CommonModule,NavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  close:boolean=false;
  toggleSlider() {
    this.close = !this.close;
  }
}
