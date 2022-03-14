import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login()
    .subscribe({
      // aqui solo entrarn respuestas correctas del servidor
      next:(resp)=>{
          console.log(resp);
          if(resp.id){
            this.router.navigate(['./heroes'])
          }
      },
      // aqui entra si hay algún error
      error:(error)=>{
        console.log('error')
      }
    });
  }
  ingresarSinLogin(){
    this.router.navigate(['./heroes']);
  }
}
