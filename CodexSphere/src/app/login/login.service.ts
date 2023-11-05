import { Injectable } from "@angular/core";
import { ApiHelperService } from "../global-services/api/global_api_ref.service";
import axios from "axios";
import { UserStoreService } from "../global-services/store-service/user-service.service";
import { Router } from "@angular/router";

@Injectable()
export class LoginService{
    constructor(private apiHelper : ApiHelperService, private userStore: UserStoreService , private router: Router){
        // if(this.userStore.userId!=="" && this.userStore.key!==""){
        //     this.router.navigate(['/home']);
        // }
    }

    private email: string | undefined;
    private password: string | undefined;
    private avatar: string | undefined;
    private user: string | undefined;
    private about: string | undefined;

    private userId: string | undefined;
    private key: string | undefined;


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

    async signUp(){ 
        await axios.post(this.apiHelper.signup, {
            email: this.email,
            password: this.password
        }).then((response)=>{
            if(response.status!==401){
                this.userId=response.data.user_id;
                this.key=response.data.key;
                this.router.navigate(["login/profile"]);
            }else{
                console.log(response.data);
            }
        });
    }

    async createProfile(github: string, linkedin: string){
        await axios.post(this.apiHelper.create_profile, {
            "user_id": this.userId,
            "key": this.key,
            "github": github? github: null,
            "linkedin": linkedin? linkedin: null,
            "description": this.about,
            "user":{
                "username": this.user,
                "avatar": this.avatar
            }
        }).then((response)=>{
            if(response.status!==401){
                localStorage.setItem('userId', response.data.user_id);
                localStorage.setItem('key', this.key!);
                this.userStore.userId=response.data.user_id;
                this.userStore.key=response.data.key;
                this.userStore.updateData(response.data.user.avatar.image!, response.data.user.username!);
                this.router.navigate(['/home']);
            }else{
                console.log(response.data);
            }
        });
    }
    async updateProfile(github: string, linkedin: string){

        console.log(this.userStore.key);
        await axios.post(this.apiHelper.update_profile, {
            "github": github? github: null,
            "linkedin": linkedin? linkedin: null,
            "user_id": this.userStore.userId,
            "key": this.userStore.key,
            "description": this.about,
            "user":{
                "username": this.user,
                "avatar": this.avatar
            }
        }).then((response)=>{
            if(response.status!==401){
                console.log(response.data);
                this.userStore.userId=response.data.user_id;
                this.userStore.key=response.data.key;
                this.userStore.updateData(response.data.user.avatar.image!, response.data.user.username!);
                window.history.back();
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
            localStorage.setItem('username' , response.data.user.username);
            localStorage.setItem('avatar' , response.data.user.avatar.image);
            this.userStore.updateData(response.data.user.avatar.image,response.data.user.username!);
            this.userStore.userId=response.data.user_id;
            this.userStore.key=response.data.key;
            console.log(response.data);
            this.router.navigate(['/home']);
        })
    }
}