import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  public login(Datos: any){
    return this.http.post(
      `${this.baseUrl}/api/empresa/login`,
      Datos
    );
  }
}
