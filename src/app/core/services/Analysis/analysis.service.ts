import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private httpClient:HttpClient) { }
  getAllAnalysis():Observable<any>{
    return this.httpClient.get(`https://personal-profiling-and-assistance-app.runasp.net/api/Admin/Analysis`);
  }
}
