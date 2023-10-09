import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./projects/projects.module').then((mod) => mod.ProjectsModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((mod) => mod.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
