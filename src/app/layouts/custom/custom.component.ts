import { Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ColorService } from '../../core/services/color.service';

@Component({
  selector: 'app-custom',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css']
})
export class CustomComponent {
  private colorService=inject(ColorService); // استدعاء الخدمة
  isPaletteVisible: boolean = false; // حالة ظهور لوحة الألوان

  togglePalette(): void {
    this.isPaletteVisible = !this.isPaletteVisible;
  }

  changeColor(color: string): void {
    this.colorService.setColor(color); // نبعث اللون للخدمة
    this.isPaletteVisible = false;
  }
}
