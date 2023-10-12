import { Component, ElementRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { ErrorService } from 'src/app/global-services/error/error.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation:ViewEncapsulation.Emulated
})
export class SignupComponent {
  constructor(private router : Router , private errorService : ErrorService, private loginService : LoginService){
  }

  @ViewChild('email') email : ElementRef | undefined ;
  @ViewChild('password') password : ElementRef | undefined ;
  @ViewChild('confirmPass') confirmPass : ElementRef | undefined ;
  

  signup(){
    const result=this.errorService.checkPassword(this.password?.nativeElement.value,this.confirmPass?.nativeElement.value);
    if(result!=="Error"){
      this.loginService.setLoginDetails(this.email?.nativeElement.value,this.password?.nativeElement.value);
      this.router.navigate(["login/profile"]);
    }
  }
  
  login(){
    this.router.navigate(["login"]);
  }
}
