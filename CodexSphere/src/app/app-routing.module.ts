import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./projects/projects.module').then((mod) => mod.ProjectsModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((mod) => mod.LoginModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((mod) => mod.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
