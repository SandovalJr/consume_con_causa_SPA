import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient, private router: Router) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  guardarLocalStorage(token: string){
    if(token !== undefined){
      localStorage.setItem('token', token);
    }
  }

  public login(Datos: any){
    return this.http.post(
      `${this.baseUrl}/api/empresa/login`,
      Datos
    )
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token);
      })
    );
  }

  public logOut(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  validarToken(): Observable<boolean>{
    return this.http.get(`${this.baseUrl}/api/empresa/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      tap((resp: any) => {
        console.log('Respuesta', resp);
        this.guardarLocalStorage(resp.token);
      }),
      map((resp: any) => {
        return true;
      }),
      catchError(error => of(false))
    )
  }
}
