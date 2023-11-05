import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './create-project/create-project.component';
import { BlogComponent } from './blog/blog.component';
import { BlogResolver } from './blog.resolver';

const routes: Routes = [
    {
        path:'new',
        component: CreateProjectComponent
    },
    {
      path:'update',
      component: CreateProjectComponent
    },
    {
      path: ':blog_id',
      component: BlogComponent,
      resolve: {
        blogData: BlogResolver
      }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
