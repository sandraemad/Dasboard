import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../core/services/Account/account.service';
import { IProfile } from '../../shared/interface/iprofile';
import { jwtDecode } from 'jwt-decode';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [RouterLink,NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  private readonly accountService=inject(AccountService);
 
  profileAdminData!:IProfile;
  isEditing: boolean = false;

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    // هنا تقدر تضيف منطق التحقق والحفظ
    this.isEditing = false;
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

