import { Component, ElementRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { ErrorService } from 'src/app/global-services/error/error.service';
import { HelperService } from 'src/app/global-services/helper/helper.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation:ViewEncapsulation.Emulated
})
export class SignupComponent {
  constructor(private router : Router , private errorService : ErrorService, private loginService : LoginService, private helperService: HelperService){
  }

  @ViewChild('email') email : ElementRef | undefined ;
  @ViewChild('password') password : ElementRef | undefined ;
  @ViewChild('confirmPass') confirmPass : ElementRef | undefined ;
  

  async signup(){
    if(this.email?.nativeElement.value === ""){
      this.helperService.showSnackbar("Please enter your email address")
    } else if(this.password?.nativeElement.value === ""){
      this.helperService.showSnackbar("Please enter your password")
    } else{
      const result=this.errorService.checkPassword(this.password?.nativeElement.value,this.confirmPass?.nativeElement.value);
      if(result!=="Error"){
      this.loginService.setLoginDetails(this.email?.nativeElement.value,this.password?.nativeElement.value);
      await this.loginService.signUp();
    }
    }
    
  }
  
  login(){
    this.router.navigate(["login"]);
  }
}
