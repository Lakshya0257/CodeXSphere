import { Injectable } from "@angular/core";
import axios from "axios";
import { ApiHelperService } from "../global-services/api/global_api_ref.service";
import { UserStoreService } from "../global-services/store-service/user-service.service";
import { Router } from "@angular/router";

@Injectable()
export class ProfileService{
    
    constructor(private userStore: UserStoreService, private apiService: ApiHelperService, private router: Router){}

    async getUser(user_id: string){
        console.log(user_id);
        if(this.userStore.key!=="" && this.userStore.userId!==""){
            return (await axios.get(this.apiService.user+'/'+user_id,{params:{
                user_id: this.userStore.userId,
                key: this.userStore.key
            }})).data;
        }else {
            return (await axios.get(this.apiService.user+'/'+user_id)).data
        }
    }
    async getUserBlogs(user_id: string){
        if(this.userStore.key!=="" && this.userStore.userId!==""){
            return (await axios.get(this.apiService.profile_blogs+'/'+user_id,{params:{
                user_id: this.userStore.userId,
                key: this.userStore.key
            }})).data;
        }else {
            return (await axios.get(this.apiService.profile_blogs+'/'+user_id)).data
        }
    }

    async followUser(user_id:string){
        if(this.userStore.userId==="" || this.userStore.key===""){
            this.router.navigate(['/login']);
            return;
        }
        console.log(this.userStore.userId)
        console.log(this.userStore.key)
        return await axios.post(this.apiService.follow_user+user_id,{
            user_id: this.userStore.userId,
            key: this.userStore.key
        })
    }
}