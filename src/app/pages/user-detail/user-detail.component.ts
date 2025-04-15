import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../core/services/Users/users.service';
import { ActivatedRoute } from '@angular/router';
import { IuserDetail } from '../../shared/interface/iuser-detail';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  imports: [DatePipe],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
private readonly usersService=inject(UsersService);
private readonly activatedRoute=inject(ActivatedRoute);

userId!:string;
userDetails:IuserDetail={} as IuserDetail;

ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe({
    next:(res)=>{
      this.userId = res.get("id") ?? '';
      this.usersService.userDetail(this.userId).subscribe({
        next:(res)=>{
          console.log(res);
          this.userDetails=res;
        },
        error:(err)=>{
          console.log(err);
        }
      });
    },
    error:()=>{

    }
  })

}
}
