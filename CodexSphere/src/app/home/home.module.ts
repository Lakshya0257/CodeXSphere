import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ProjectContainerComponent } from './project-container/project-container.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


console.log('Home module loaded')
@NgModule({
  declarations: [
    HomeComponent,
    ProjectContainerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule
  ]
})
export class HomeModule { }
