import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad,CanActivate {
  constructor(private authService: AuthService, private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //   if(this.authService.auth.id){
    //     return true;
    //   }
    //   console.log('Bloqueado por el guard - canActivate');
    // return false;
    return this.authService.vericaAuteticacion()
    .pipe(
      tap(autenticado=>{
            if(!autenticado){
              this.router.navigate(['./auth/login'])
            }
          }
        )
    )
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      // console.log('canLoad',true);
      // console.log(route);
      // console.log(segments);
    //   if(this.authService.auth.id){
    //     return true;
    //   }
    //   console.log('Bloqueado por el guard - canLoad');
    // return false;
    return this.authService.vericaAuteticacion().pipe(
      tap(autenticado=>{
            if(!autenticado){
              this.router.navigate(['./auth/login'])
            }
          }
        )
    )
  }
}
