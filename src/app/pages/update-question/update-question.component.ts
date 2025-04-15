import { Component, inject, OnInit } from '@angular/core';
import { QuestionService } from '../../core/services/Question/question.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-question',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.css'
})
export class UpdateQuestionComponent implements OnInit{
  private readonly questionService=inject(QuestionService);
   private readonly activatedRoute=inject(ActivatedRoute);
    private readonly toastrService=inject(ToastrService);
    private readonly router=inject(Router);
    TestId!:number;


    UpdateQuestionFrom: FormGroup = new FormGroup({
      content: new FormControl(null, [Validators.required]),
      choices: new FormArray([
        new FormControl(null, [Validators.required]),
        new FormControl(null, [Validators.required]),
        new FormControl(null, [Validators.required]),
        new FormControl(null, [Validators.required])
      ])
      });

      UpdateQuestion(): void {
        this.activatedRoute.paramMap.subscribe({
          next: (res) => {
            const idParam = res.get('id');
            if (idParam !== null) {
              this.TestId = +idParam;
              this.questionService.getQuestionById(this.TestId).subscribe({
                next: (res: any) => {
                  console.log("بيانات السؤال:", res);
                  this.UpdateQuestionFrom.patchValue({
                    content: res.data.content,
                    choices: res.data.choices.map((choice: { content: string }) => choice.content) // استخراج النص فقط
                  });
                  this.UpdateQuestionFrom.get('content')?.setValue(res.data.content);


                      const choicesArray = this.UpdateQuestionFrom.get('choices') as FormArray;
                      choicesArray.clear(); // مسح الاختيارات القديمة

                      // إضافة الاختيارات الجديدة
                      res.data.choices.forEach((choice: { content: string }) => {
                        choicesArray.push(new FormControl(choice.content, [Validators.required]));
                      });


                },
                error: (err) => {
                  console.error("❌ خطأ في جلب البيانات:", err);
                }
              });
            }
          }
        });
      }
      get choices(): FormArray {
        return this.UpdateQuestionFrom.get('choices') as FormArray;

      }
      SendUpdateQuestion(): void {
        if (!this.TestId) {
          console.error("❌ لم يتم تعيين TestId! تأكد من تحميل البيانات قبل التحديث.");
          return;
        }
      
        console.log("🚀 البيانات قبل التحديث:", this.UpdateQuestionFrom.value);
      
        // هنا هنعدل على حسب شكل choice
        const formattedChoices = this.choices.value.map((choice: any) => choice.content); // 👈 نخليها array of strings
      
        const payload = {
          
            content: this.UpdateQuestionFrom.get('content')?.value,
            choices: this.choices.value // 👈 هنا مباشرة من غير map(content)
          
          
        };
      
        console.log("🚀 البيانات المرسلة بعد التنسيق:", payload);
      
        this.questionService.UpdateQuestion(this.TestId, payload).subscribe({
          next: (res) => {
            console.log(this.TestId);
            console.log("✅ تم تحديث السؤال بنجاح:", res);
            this.toastrService.success("تم تحديث السؤال بنجاح", "نجاح");
            this.UpdateQuestionFrom.reset();
            this.router.navigate(['/question',res.data.testId]);
          },
          error: (err) => {
            console.error("❌ خطأ في تحديث السؤال:", err);
          }
        });
      }
      





  ngOnInit(): void {
    this.UpdateQuestion();
  }



}
