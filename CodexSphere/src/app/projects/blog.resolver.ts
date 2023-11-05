// blog.resolver.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProjectService } from './project.service';

@Injectable()
export class BlogResolver implements Resolve<any> {
  constructor(private projectService: ProjectService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.projectService.getBlog(route.paramMap.get('blog_id')!);
  }
}
