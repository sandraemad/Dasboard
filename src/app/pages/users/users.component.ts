import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../core/services/Users/users.service';
import { IUser } from '../../shared/interface/iuser';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  imports: [RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];

  private readonly usersService=inject(UsersService)
  private readonly toastrService=inject(ToastrService);

  getAllUsers() {
    this.usersService.getAllUsers().subscribe({
      next:(response)=>{
        console.log(response);
        if(response.success){
          this.users=response.data;
        }

      },
      error:(error)=>{
        console.log(error);
      }
    })
  }


  delete() {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا الإجراء!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم، احذفه!"
    }).then((result) => {
      if (result.isConfirmed) {
        // بعد الموافقة، نقوم بحذف المستخدم
        this.usersService.deleteUser().subscribe({
          next: (response) => {
            if (response.success) {
              Swal.fire({
                title: "تم الحذف!",
                text: "تم حذف المستخدم بنجاح.",
                icon: "success"
              });

              this.getAllUsers();

            } else {
              this.toastrService.error("لم يتم حذف المستخدم. يرجى المحاولة لاحقًا.", "خطأ!");
            }
          },
          error: (error) => {
            console.log(error);
            this.toastrService.error("حدث خطأ أثناء حذف المستخدم.", "خطأ!");
          }
        });
      }
    });

  }

  ngOnInit(): void {
    this.getAllUsers();
  }



}
