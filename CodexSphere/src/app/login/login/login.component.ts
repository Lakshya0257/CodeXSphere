import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation:ViewEncapsulation.Emulated
})
export class LoginComponent {
  constructor(private router : Router, private loginService: LoginService){}

  @ViewChild('email') email: ElementRef | undefined;
  @ViewChild('password') password: ElementRef | undefined;

  login(){
    console.log('Loggingin')
    this.loginService.setLoginDetails(this.email?.nativeElement.value,this.password?.nativeElement.value);
    this.loginService.login();
  }


  signUp(){

    // console.log('signUp');
    this.router.navigate(["login/signup"]);
  }
}
