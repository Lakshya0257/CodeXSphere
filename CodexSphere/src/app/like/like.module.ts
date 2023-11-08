import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeComponent } from './like/like.component';
import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';
import { ProjectContainerComponent } from '../home/project-container/project-container.component';
import { LikeRoutingModule } from './like-routing.module';



@NgModule({
  declarations: [
    LikeComponent
  ],
  imports: [
    CommonModule,
    ProjectContainerComponent,
    LikeRoutingModule
  ],
  providers:[LikeService,LikeResolver]
})
export class LikeModule { }
