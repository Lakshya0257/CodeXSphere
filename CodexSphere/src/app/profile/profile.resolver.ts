// blog.resolver.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProfileService } from './profile.service';

@Injectable()
export class ProfileResolver implements Resolve<any> {
  constructor(private profileService: ProfileService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.profileService.getUser(route.paramMap.get('profile_id')!);
  }
}
