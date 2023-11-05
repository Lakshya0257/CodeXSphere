import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectRoutingModule } from './projects-routing.module';
import { ProjectService } from './project.service';
import { FormsModule } from '@angular/forms';
import { BlogComponent } from './blog/blog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommentComponent } from './comment/comment.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BlogResolver } from './blog.resolver';



@NgModule({
  declarations: [
    CreateProjectComponent,
    BlogComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    FontAwesomeModule,
    MatDialogModule
  ],
  providers:[
    ProjectService,
    BlogResolver
  ]
})
export class ProjectsModule { }
