import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from '../profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoreService } from 'src/app/global-services/store-service/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ProfileComponent implements OnInit {
  constructor(private profileService: ProfileService, private route: ActivatedRoute, private userStore: UserStoreService, private router: Router){
    this.profile_data=this.route.snapshot.data['profileData'];
  }

  profile_data: any;
  data: any;
  self: boolean = false;
  following: boolean = false;
  github: string= '';
  linkedin: string = '';

  async ngOnInit() {
    this.self = this.userStore.userId===this.route.snapshot.paramMap.get('profile_id')!;
    this.following=this.profile_data.isFollowing;
    // this.profile_data= await this.profileService.getUser(this.route.snapshot.paramMap.get('profile_id')!);
    this.data= await this.profileService.getUserBlogs(this.route.snapshot.paramMap.get('profile_id')!);
    

    for(const link of this.profile_data.links){
      if(link.media_type.type === "linkedin"){
        this.linkedin=link.link;
      }
      if(link.media_type.type === "github"){
        this.github=link.link;
      }
    }

    console.log(this.profile_data);
  }

  editProfile(){
    this.router.navigateByUrl('/login/profile',{
      state: {data: this.profile_data}
    });
  }

  navigate(url: string){
    window.open(url, '_blank');
  }

  // delete(){

  // }

  logout(){
    this.userStore.resetStore();
    this.router.navigateByUrl('/home');
  }

  async follow(){
    if(this.following){
      this.profile_data.followers--;
    }else{
      this.profile_data.followers++;
    }
    this.following=!this.following;
    await this.profileService.followUser(this.profile_data.user_id);
  }
}
