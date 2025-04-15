import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../core/services/Account/account.service';
import { ColorService } from '../../core/services/color.service';
import { SliderService } from '../../shared/interface/slider.service';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  public readonly accountService=inject(AccountService);
   private colorService=inject(ColorService); // استدعاء الخدمة
  // isCollapsed = false;


  // toggleNavigation() {
  //   this.isCollapsed = !this.isCollapsed;
  // }
  ngOnInit(): void {
    this.colorService.color$.subscribe(color => {
      const navbar = document.querySelector('.sidebar') as HTMLElement;
      if (navbar) {
        if (document.body.classList.contains('dark-mode')) {
          // لو دارك مود -> امسح اي لون Inline وخلي CSS يتحكم
          navbar.style.backgroundColor = '';
        } else {
          // لو Light Mode -> طبق اللون اللي المستخدم اختاره
          navbar.style.backgroundColor = color;
        }
      }
    });
    
    
    
  
  }
  



}
