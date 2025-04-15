import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
private readonly router=inject(Router);
 

  constructor(private httpClient:HttpClient) { }
  login(Admin:object):Observable<any>{
    return this.httpClient.post('https://personal-profiling-and-assistance-app.runasp.net/api/Account/LoginAdmin',Admin);
  }
  getUserData():void{
    const token = localStorage.getItem('token');
    
  }

  loggout():void{
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }

  getProfileAdmin():Observable<any>{
    

    return this.httpClient.get(`https://personal-profiling-and-assistance-app.runasp.net/api/Admin/GetUserById/`);

  }
  updateProfileAdmin(data:object):Observable<any>{
    return this.httpClient.put(`https://personal-profiling-and-assistance-app.runasp.net/api/Admin/UpdateAdmin/`,data);
  }


}
