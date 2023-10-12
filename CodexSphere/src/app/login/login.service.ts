import { Injectable } from "@angular/core";
import { ApiHelperService } from "../global-services/api/global_api_ref.service";
import axios from "axios";
import { NgxImageCompressService } from "ngx-image-compress";
import { UserStoreService } from "../global-services/store-service/user-service.service";
import { Router } from "@angular/router";

@Injectable()
export class LoginService{
    constructor(private apiHelper : ApiHelperService, private userStore: UserStoreService , private router: Router){}

    private email: string | undefined;
    private password: string | undefined;
    private avatar: string | undefined;
    private user: string | undefined;
    private about: string | undefined;


    setLoginDetails(e: string, p: string){
        this.email=e;
        this.password=p;
    }

    setProfileDetails( username: string, ab: string){
        this.user=username;
        this.about=ab;
    }

    setAvatar(a: string ){
        this.avatar=a;
    }

    

    signUp(){
        axios.post(this.apiHelper.signup, {
            name : this.user,
            email: this.email,
            password: this.password,
            avatarUrl: this.avatar,
            about: this.about
        }).then((response)=>{
            if(response.status!==401){
                localStorage.setItem('userId', response.data.user_id);
                localStorage.setItem('key', response.data.key);
                localStorage.setItem('username' , response.data.username!);
                localStorage.setItem('avatar' , response.data.avatar);
                this.userStore.updateData(response.data.avatar,response.data.username!);
                this.router.navigate(['/home']);
            }else{
                console.log(response.data);
            }
        });
    }

    login(){
        axios.post(this.apiHelper.login,{
            email: this.email,
            password: this.password
        }).then(response =>{
            localStorage.setItem('userId', response.data.user_id);
            localStorage.setItem('key', response.data.key);
            localStorage.setItem('username' , response.data.username);
            localStorage.setItem('avatar' , response.data.avatar);
            this.userStore.updateData(response.data.avatar,response.data.username!);
            console.log(response.data);
            this.router.navigate(['/home']);
        })
    }
}