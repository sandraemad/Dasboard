import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuestionService } from '../../core/services/Question/question.service';
import { IQuestion } from '../../shared/interface/iquestion';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-question',
  imports: [RouterLink],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit {
  private readonly questionService=inject(QuestionService);
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly toastrService=inject(ToastrService);
  TestId!:number;
  questions:IQuestion[]=[];
  testName!:string;
  count:number=0;
  

  getAllQuection():void{
    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        const idParam = res.get('id');
      if (idParam !== null) {
        this.TestId = +idParam;
        this.questionService.getAllQuestions(this.TestId).subscribe({
          next:(res)=>{
            console.log(res.data);
            this.testName=res.data.testName;
            this.questions=res.data.questions;
            console.log("objest",res.data.questions)

          }
        })
      }
    }

    })

  }
  deleteQuection(id:number):void{
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
        // تنفيذ الحذف بعد التأكيد
        this.questionService.deleteQuestion(id).subscribe({
          next: (res) => {
            if (res.success) {
              Swal.fire({
                title: "تم الحذف!",
                text: "تم حذف السؤال بنجاح.",
                icon: "success"
              });
    
              this.getAllQuection();
           
            } else {
              this.toastrService.error("لم يتم حذف السؤال. يرجى المحاولة لاحقًا.", "خطأ!");
            }
          },
          error: (error) => {
            console.log(error);
            this.toastrService.error("حدث خطأ أثناء حذف السؤال.", "خطأ!");
          }
        });
      }
    });
    
  }

  ngOnInit(): void {
    this.getAllQuection();

  }

}
