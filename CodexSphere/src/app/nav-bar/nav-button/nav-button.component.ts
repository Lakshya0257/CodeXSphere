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
}
