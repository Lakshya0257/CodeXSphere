import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class NavButtonComponent {

  constructor(private router: Router){}

  isRouteActive(route: string){
    return this.router.url===route;
  }

  isLogin(){
    console.log('loginnn');
    const cookieValue = document.cookie
  .split("; ")
  .find((row) => row.startsWith("userId="))
  ?.split("=")[1];

  if(cookieValue === undefined){
    this.router.navigate(["login"]);
  }else{
    this.router.navigate(["projects/new"]);
  }
  }

  
}
