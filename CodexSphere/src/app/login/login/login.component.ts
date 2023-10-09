import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation:ViewEncapsulation.Emulated
})
export class LoginComponent {
  constructor(private router : Router){}
  signUp(){
    // console.log('signUp');
    this.router.navigate(["login/signup"]);
  }
}
