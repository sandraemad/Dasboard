import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AccountService } from '../../core/services/Account/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
private readonly toastrService=inject(ToastrService);
private readonly router=inject(Router);

  mgError: String = '';
  isSucces: String = '';
  private readonly accountService = inject(AccountService);
  // private readonly router = inject(Router);

  login: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      // Validators.pattern(/^[A-Z]\w{7,}$/),
    ]),
  });




  submitForm(): void {
    if (this.login.valid) {

      this.accountService.login(this.login.value).subscribe({
        next: (res) => {
          console.log("logincomponent",res);
          if (res.success) {
            console.log(res.data.token);
            this.login.reset();
            this.toastrService.success('تم تسجيل الدخول بنجاح!', 'نجاح!');
            setTimeout(() => {
              localStorage.setItem('token',res.data.token);
              this.accountService.getUserData();
              
              this.router.navigate(['/analysis']);
            }, 500);
          }

        },
        // error: (err) => {
        //   this.toastrService.error(err.error?.errorMessage || 'حدث خطأ غير متوقع', 'خطأ');
        // }
        // ,
      });
    }
    else{
      this.login.markAllAsTouched();
    }
  }



}
