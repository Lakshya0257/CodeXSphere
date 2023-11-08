import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule
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
