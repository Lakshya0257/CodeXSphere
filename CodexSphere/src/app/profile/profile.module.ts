import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './profile.service';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProjectContainerComponent } from '../home/project-container/project-container.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileResolver } from './profile.resolver';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FontAwesomeModule,
    ProjectContainerComponent
  ],
  providers:[ProfileService,ProfileResolver]
})
export class ProfileModule { }
