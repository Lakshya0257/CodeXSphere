import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ProfileResolver } from './profile.resolver';

const routes: Routes = [
    {
      path: ':profile_id',
      component: ProfileComponent,
      resolve:{
        profileData: ProfileResolver,
    }
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProfileRoutingModule { }