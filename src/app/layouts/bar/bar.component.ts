import { Component, inject } from '@angular/core';
import e from 'express';
import { SliderService } from '../../shared/interface/slider.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../core/services/Account/account.service';
import { IProfile } from '../../shared/interface/iprofile';

@Component({
  selector: 'app-bar',
  imports: [CommonModule,RouterLink],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css'
})
export class BarComponent {
  private readonly sliderService=inject(SliderService);
  private readonly accountService=inject(AccountService);
  darkMode:boolean=false;
  close:boolean=false;
profileAdminData!:IProfile;

  changMode(): void {
    this.darkMode = !this.darkMode;
    
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }
  toggleSlider() {
    this.close=!this.close;
  }
  ngOnInit(): void {
  


    this.accountService.getProfileAdmin().subscribe({
      next: (data) => {
        this.profileAdminData = data.data;
        console.log("Profile Admin Data:", this.profileAdminData);
      },
      error: (error) => {
        console.error("Error fetching profile data:", error);
      }
    });
  }



}


