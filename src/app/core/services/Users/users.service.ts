import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient:HttpClient) { }

  getAllUsers():Observable<any>{
    return this.httpClient.get(`${Environment.baseUrl}Admin/GetAllUsers`);
  }
  // getUserById(id:string):Observable<any>{
  //   return this.httpClient.get(`https://personal-profiling-and-assistance-app.runasp.net/api/Admin/GetUserById/${id}`);
  // }
  deleteUser():Observable<any>{
    return this.httpClient.delete(`https://personal-profiling-and-assistance-app.runasp.net/api/Admin/DeleteUser`);
  }
  userDetail(id:string):Observable<any>{
    return this.httpClient.get(`https://personal-profiling-and-assistance-app.runasp.net/api/Admin/GetUserDetails/${id}`);

  }

}
