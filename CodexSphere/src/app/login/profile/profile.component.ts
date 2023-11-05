import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../login.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { HelperService } from 'src/app/global-services/helper/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation:ViewEncapsulation.Emulated
})
export class ProfileComponent implements AfterViewInit {

  constructor(private loginService: LoginService , private imageCompress: NgxImageCompressService,private helperService: HelperService, private router: Router){
    const navigation = this.router.getCurrentNavigation();
    if (navigation!.extras.state) {
      if(navigation!.extras.state['data']){
        this.profile_data = navigation!.extras.state['data'];
        console.log(this.profile_data);
        this.edit_profile=true;
      }else if(navigation!.extras.state['signUpData']){
        
      }
      
    }
  }

  ngAfterViewInit(): void {
    if(this.edit_profile){
      this.username!.nativeElement.value= this.profile_data.username;
      this.about!.nativeElement.value= this.profile_data.description;
      this.imagePreview=this.profile_data.avatar.image;

      for(const link of this.profile_data.links){
        if(link.media_type.type==='linkedin'){
          this.linkedin!.nativeElement.value=link.link;
        }else if(link.media_type.type==='github'){
          this.github!.nativeElement.value=link.link;
        }
      }
    }
  }

  edit_profile:boolean = false;
  profile_data: any;

  imagePreview : string | ArrayBuffer = "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg";
  @ViewChild('username') username : ElementRef | undefined ;
  @ViewChild('about') about : ElementRef | undefined ;
  @ViewChild('github') github : ElementRef | undefined ;
  @ViewChild('linkedin') linkedin : ElementRef | undefined ;

  // onImageInputChange(event: any) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.imagePreview = reader.result ?? '';
  //     console.log(this.imagePreview);
  //   };
  // }

  onImageInputChange() {
    this.imageCompress.uploadFile().then(({image, orientation}) => {
        console.log('Size in bytes of the uploaded image was:', this.imageCompress.byteCount(image));

        this.imageCompress
            .compressFile(image, orientation, 50, 50) // 50% ratio, 50% quality
            .then(compressedImage => {
                this.loginService.setAvatar(compressedImage);
                this.imagePreview=compressedImage;
                console.log('Size in bytes after compression is now:', this.imageCompress.byteCount(compressedImage));
            });
    });
}

  profile(){
    if(this.username?.nativeElement.value===""){
      this.helperService.showSnackbar('Please enter a username')
    }
    else if(this.about?.nativeElement.value===""){
      this.helperService.showSnackbar('Please fill the description')
    } else{
      this.loginService.setProfileDetails(this.username?.nativeElement.value,this.about?.nativeElement.value);
      if(!this.edit_profile){
        this.loginService.createProfile(this.github?.nativeElement.value,this.linkedin?.nativeElement.value);
      }else{
        this.loginService.updateProfile(this.github?.nativeElement.value,this.linkedin?.nativeElement.value);
      }
      
    }
  }
}
