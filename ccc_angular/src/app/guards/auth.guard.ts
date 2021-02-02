import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, UrlSegment, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { tap } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router){}

  // canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
  //   return this.loginService.validarToken().pipe(
  //     tap(isAuth => {
  //       if(!isAuth){
  //         this.router.navigateByUrl('/LogIn');
  //       }
  //     })
  //   );
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    return this.loginService.validarToken().pipe(
      tap(isAuth => {
        if(!isAuth){
          this.router.navigateByUrl('/LogIn');
        }
      })
    )
  }
  
}
