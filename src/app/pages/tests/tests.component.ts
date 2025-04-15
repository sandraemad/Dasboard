import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TestsService } from '../../core/services/Tests/tests.service';
import { error } from 'console';
import { ITest } from '../../shared/interface/itest';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import e from 'express';
import Swal from 'sweetalert2';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tests',
  imports: [RouterLink,ReactiveFormsModule,SweetAlert2Module,FormsModule,CommonModule],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.css'
})


export class TestsComponent implements OnInit {
  private readonly testsService = inject(TestsService);
   private readonly toastrService=inject(ToastrService);
   @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  testName: ITest[] = [];
  editMode: boolean = false;
  selectedTestId!: number;

  savePhoto: File | null = null;
  Name:string="";
  Description:string="";
  image!:string;
  showFileInput = true;
  NameUpdate:string="";
  DescriptionUpdate:string="";

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


AddTest(): void {
  const formData=new FormData();
  formData.append("Name",this.Name);
  formData.append("Description",this.Description);
  if (this.savePhoto) {
    formData.append("Testimage", this.savePhoto);
  }
  console.log(formData);
  this.testsService.addTest(formData).subscribe({
    next:(res)=>{
      if(res.success){
        this.Name = '';
        this.Description = '';
        this.savePhoto=null;
        this.showFileInput = false;
        setTimeout(() => {
          this.showFileInput = true;
        }, 0);
        
       
        this.toastrService.success("تم اضافه السؤال بنجاح", "نجاح");
        this.gettAllTests();

      }
     
      

    }

  })
}



  EditTest(id: number): void {
    this.editMode = true;
    this.selectedTestId = id;
    this.testsService.getTestById(id).subscribe({
      next:(res)=>{
        console.log(res.data);
          this.savePhoto=res.data.testImage;
          this.NameUpdate=res.data.name;
           this.DescriptionUpdate=res.data.description;
           this.image= 'data:image/jpeg;base64,'+res.data.testImage;

      }
    })
    
  
  }
  DeleteTest(id: number): void {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم، احذفه!",
      cancelButtonText: "إلغاء"
    }).then((result) => {
      if (result.isConfirmed) {
        this.testsService.deleteTest(id).subscribe({
          next: (res) => {
       
              this.gettAllTests(); // تحديث القائمة بعد الحذف

              Swal.fire({
                title: "تم الحذف!",
                text: "تم حذف الاختبار بنجاح.",
                icon: "success"
              });
            
          },
          error: (error: HttpErrorResponse) => {
            console.log('error:', error);
          },
        });
      }
    });
  }

  updateTest(): void {
    const formData=new FormData();
    formData.append("Name",this.NameUpdate);
    formData.append("Description",this.DescriptionUpdate);
    if (this.savePhoto) {
      formData.append("Testimage", this.savePhoto);
    }
    console.log(formData);
    this.testsService.updateTest(this.selectedTestId,formData).subscribe({
      next:(res)=>{
        console.log(res);
          this.Name = '';
          this.Description = '';
          this.savePhoto=null;
          this.showFileInput = false;
          setTimeout(() => {
            this.showFileInput = true;
          }, 0);
          this.toastrService.success("تم تحدث الاختبار بنجاح", "نجاح");
          this.editMode=false;
          this.gettAllTests();
  
        
       
        
  
      }
  
    })

    
  }
  cancelUpdate() {
    this.editMode = false;
    this.toastrService.warning('تم إلغاء التحديث', 'تحذير');
  }

  gettAllTests() {
    this.testsService.getAllTests().subscribe({
      next: (res) => {
        console.log("test",res);
        this.testName = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.gettAllTests();
  }
}

