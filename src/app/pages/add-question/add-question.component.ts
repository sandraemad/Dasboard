import { Component, inject } from '@angular/core';
import { QuestionService } from '../../core/services/Question/question.service';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-question',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent {
  private readonly questionService=inject(QuestionService);
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly router=inject(Router);
  private readonly toastrService=inject(ToastrService);
  TestId!:number;

AddQuestion: FormGroup = new FormGroup({
  content: new FormControl(null, [Validators.required]),
  choices: new FormArray([
    new FormControl(null, [Validators.required]),
    new FormControl(null, [Validators.required]),
    new FormControl(null, [Validators.required]),
    new FormControl(null, [Validators.required])
  ])
  });


  get choices(): FormArray {
    return this.AddQuestion.get('choices') as FormArray;
  }

  
  submitAddQuestion():void{
    if (this.AddQuestion.valid) {
      const subscription = this.activatedRoute.paramMap.subscribe({
        next: (res) => {
          const idParam = res.get('id');
          if (idParam !== null) {
            this.TestId = +idParam;
            console.log("Test ID:", this.TestId);
            console.log("Form Data:", this.AddQuestion.value);
    
            this.questionService.AddQuestion(this.TestId, this.AddQuestion.value).subscribe({
              next: (response) => {
                if (response.success) {
                  console.log("Question added successfully!");
                  this.AddQuestion.reset();
                  this.toastrService.success('تمت إضافة السوال بنجاح', 'نجاح!');
    
                  // الانتقال إلى صفحة الأسئلة
                  this.router.navigate(['/question',this.TestId]);
                } else {
                  console.error("Error: ", response.errorMessage);
                }
              },
              error: (err) => {
                console.error("HTTP Error:", err);
              }
            });
    
            // إلغاء الاشتراك بعد الاستخدام لمنع تسرب الذاكرة
            subscription.unsubscribe();
          }
        },
        error: (err) => {
          console.error("Error fetching route params:", err);
        }
      });
    }
    else{
      console.log("errrrorrr");
    }
 

  }


}
