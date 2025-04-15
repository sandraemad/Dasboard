import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient:HttpClient) { }

  getAllQuestions(id:number):Observable<any>
   {
    return this.httpClient.get(`https://personal-profiling-and-assistance-app.runasp.net/api/Tests/GetTestQuestions/${id}`);
   }
   deleteQuestion(id:number):Observable<any>{
    return this.httpClient.delete(`https://personal-profiling-and-assistance-app.runasp.net/api/Questions/DeleteQuestion/${id}`)
   }
   UpdateQuestion(id:number,updateQuestion:object):Observable<any>{
    return this.httpClient.put(`https://personal-profiling-and-assistance-app.runasp.net/api/Questions/UpdateQuestion/${id}`,updateQuestion);
   }
   getQuestionById(id:number):Observable<any>{
    return this.httpClient.get(`https://personal-profiling-and-assistance-app.runasp.net/api/Questions/GetQuestionById/${id}`);
   }
   AddQuestion(id:number,question:object):Observable<any>
   {
    return this.httpClient.post(`https://personal-profiling-and-assistance-app.runasp.net/api/Questions/AddQustionWithChoice/${id}`,question);
   }


}
