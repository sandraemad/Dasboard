import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../core/services/Account/account.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setting',
  imports: [FormsModule,RouterLink],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit{
  private readonly accountService=inject(AccountService);
  private readonly toastrService=inject(ToastrService);
  private readonly router=inject(Router);
 savePhoto!:File;
 username:string="";
 phonenumber:string="";
 gender:string="";
 email!:string;
 image!:string;
changIamge(e:Event):void{
  const input=e.target as HTMLInputElement;
  if(input.files && input.files.length>0){
    this.savePhoto=input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string; // هنا بتخزن البيانات المحولة من الصورة
    };
    reader.readAsDataURL(this.savePhoto); // تقرأ الصورة وتحوّلها
    console.log(input.files[0]);

  }

  }

  updateProfile():void{
    const formData=new FormData();
    formData.append("UserName",this.username);
    formData.append("PhoneNumber",this.phonenumber);
    formData.append("Gender",this.gender);
    formData.append("ProfilePicture",this.savePhoto);
    console.log(formData);
    this.accountService.updateProfileAdmin(formData).subscribe({
      next:(res)=>{
        this.toastrService.success("تم تحديث السؤال بنجاح", "نجاح");
        formData.delete;
        this.router.navigate(['/profile']);
       
      }
    })
  }
  ngOnInit(): void {
    this.accountService.getProfileAdmin().subscribe({
      next:(res)=>{
        console.log("profileAdmin",res.data);
        this.savePhoto=res.data.profilePicture;
        this.gender=res.data.gender;
        this.phonenumber=res.data.phone;
        this.username=res.data.name;
        this.email=res.data.email;
        this.image= 'data:image/jpeg;base64,'+res.data.profilePicture;
      }
    })
  }



}
