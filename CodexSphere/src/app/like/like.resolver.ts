// blog.resolver.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { LikeService } from './like.service';

@Injectable()
export class LikeResolver implements Resolve<any> {
  constructor(private likeService: LikeService) {}

  resolve() {
    return this.likeService.getLikedBlogs();
  }
}
