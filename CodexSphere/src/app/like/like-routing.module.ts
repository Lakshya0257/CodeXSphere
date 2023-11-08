import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LikeComponent } from './like/like.component';
import { LikeResolver } from './like.resolver';

const routes: Routes = [
    {
      path: '',
      component: LikeComponent,
      resolve:{
        data: LikeResolver,
    }
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LikeRoutingModule { }