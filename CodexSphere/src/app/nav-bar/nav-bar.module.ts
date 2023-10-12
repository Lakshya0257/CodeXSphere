import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavButtonComponent } from './nav-button/nav-button.component';
import { UserModule } from '../user/user.module';



@NgModule({
  declarations: [
    NavBarComponent,
    NavButtonComponent
  ],
  imports: [
    CommonModule,
    UserModule
  ],
  exports:[
    NavBarComponent
  ]
})
export class NavBarModule {
  constructor(){
    console.log("Navbar intialization");
  }
 }
