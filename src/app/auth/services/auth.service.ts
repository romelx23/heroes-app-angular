import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string=environment.URL_API;
  private _auth:Auth | undefined;

  constructor(
    private http:HttpClient
  ) { }

  get auth():Auth{
    return {...this._auth!}
  }

  login(){
      return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap(auth=>this._auth=auth),
        tap(auth=>localStorage.setItem('token',auth.id)),
      )
  }
  logout(){
    this._auth=undefined;
    localStorage.removeItem('token');
  }

  vericaAuteticacion() : Observable<boolean>{
    const token=localStorage.getItem('token');
    if(!token){
      return of(false);
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(map(auth=>{
      console.log(auth, 'map');
      this._auth=auth;
      return true;
    }))
  }
}
