import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  constructor(private httpClient:HttpClient) { }


  addTest(test:object):Observable<any>{
    return this.httpClient.post('https://personal-profiling-and-assistance-app.runasp.net/api/Tests/AddTest',test);
  }
  getAllTests():Observable<any>{
    return this.httpClient.get('https://personal-profiling-and-assistance-app.runasp.net/api/Tests/GetAllTests');
  }
  getTestById(id:number):Observable<any>{
    return this.httpClient.get(`https://personal-profiling-and-assistance-app.runasp.net/api/Tests/GetTestById/${id}`);
  }
  updateTest(id:number,test:object):Observable<any>{
    return this.httpClient.put(`https://personal-profiling-and-assistance-app.runasp.net/api/Tests/UpdateTest/${id}`,test

    );
  }
  deleteTest(id:number):Observable<any>{
    return this.httpClient.delete(`https://personal-profiling-and-assistance-app.runasp.net/api/Tests/DeleteTest/${id}`);
  }
}
