import { Component, ElementRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/error/error.service';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation:ViewEncapsulation.Emulated
})
export class SignupComponent {
  constructor(private router : Router , private errorService : ErrorService){
  }

  @ViewChild('email') email : ElementRef | undefined ;
  @ViewChild('password') password : ElementRef | undefined ;
  @ViewChild('confirmPass') confirmPass : ElementRef | undefined ;
  

  signup(){
    // this.container.createComponsent(SnackbarComponent);
    this.errorService.checkPassword('acac','acac');
    document.cookie=`email : ${this.email?.nativeElement.value}`;
    this.router.navigate(["login/profile"]);
  }
  
  login(){
    this.router.navigate(["login"]);
  }
}
