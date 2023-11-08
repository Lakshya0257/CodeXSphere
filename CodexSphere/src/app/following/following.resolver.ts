// blog.resolver.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { FollowingService } from './following.service';

@Injectable()
export class FollowingResolver implements Resolve<any> {
  constructor(private followingService: FollowingService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.followingService.getFollowingBlogs();
  }
}
