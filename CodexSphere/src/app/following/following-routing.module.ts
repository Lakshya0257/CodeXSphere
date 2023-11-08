import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowingPageComponent } from './following-page/following-page.component';
import { FollowingResolver } from './following.resolver';

const routes: Routes = [
    {
      path: '',
      component: FollowingPageComponent,
      resolve:{
        data: FollowingResolver,
    }
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class FollowingRoutingModule { }