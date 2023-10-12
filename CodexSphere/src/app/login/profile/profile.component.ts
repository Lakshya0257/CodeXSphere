import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../login.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation:ViewEncapsulation.Emulated
})
export class ProfileComponent {

  constructor(private loginService: LoginService , private imageCompress: NgxImageCompressService){}
  imagePreview : string | ArrayBuffer = "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg";
  @ViewChild('username') username : ElementRef | undefined ;
  @ViewChild('about') about : ElementRef | undefined ;

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

  createProfile(){
    this.loginService.setProfileDetails(this.username?.nativeElement.value,this.about?.nativeElement.value);
    this.loginService.signUp();
  }

}
