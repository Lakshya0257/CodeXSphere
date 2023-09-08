import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectRoutingModule } from './projects-routing.module';



@NgModule({
  declarations: [
    CreateProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectsModule { }
