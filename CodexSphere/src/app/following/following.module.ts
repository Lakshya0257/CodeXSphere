import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowingPageComponent } from './following-page/following-page.component';
import { FollowingService } from './following.service';
import { FollowingResolver } from './following.resolver';
import { FollowingRoutingModule } from './following-routing.module';
import { ProjectContainerComponent } from '../home/project-container/project-container.component';



@NgModule({
  declarations: [
    FollowingPageComponent
  ],
  imports: [
    CommonModule,
    FollowingRoutingModule,
    ProjectContainerComponent
  ],
  providers:[FollowingService, FollowingResolver]
})
export class FollowingModule { }
