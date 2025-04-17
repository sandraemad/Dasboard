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


  delete(id: string) {
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
        this.usersService.deleteUser(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: "تم الحذف!",
              text: res.errorMessage || "تم حذف المستخدم بنجاح.",
              icon: "success"
            });
            console.log(res);
            this.getAllUsers();
          },
          error: (err) => {
            Swal.fire({
              title: "فشل الحذف!",
              text: err.message || "حدث خطأ أثناء محاولة حذف المستخدم.",
              icon: "error"
            });
            console.error(err);
          }
        });
      }
    });
  }




  ngOnInit(): void {
    this.getAllUsers();
  }


}
