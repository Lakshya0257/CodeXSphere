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

  navigate(route: string){
    this.router.navigate([route]);
  }

  isLogin(){

  if(localStorage.getItem("key") === null){
    this.router.navigate(["login"]);
  }else{
    this.router.navigate(["projects/new"]);
  }
  }

  
}
