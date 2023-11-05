import { Injectable } from "@angular/core";
import { UserStoreService } from "../global-services/store-service/user-service.service";
import { ApiHelperService } from "../global-services/api/global_api_ref.service";
import axios from "axios";

@Injectable()
export class HomepageService {
    constructor(private userStore: UserStoreService, private apiService: ApiHelperService){}

    async getBlogs(){
        if(this.userStore.key!=="" && this.userStore.userId!==""){
            return await axios.get(this.apiService.blogs,{params:{
                user_id: this.userStore.userId,
                key: this.userStore.key
            }})
        }else {
            return await axios.get(this.apiService.blogs)
        }
    }

    async getTags(){
        return (await axios.get(this.apiService.tags)).data;
    }

    async getTagBlogs(tag: string){
        if(this.userStore.key!=="" && this.userStore.userId!==""){
            return await axios.get(this.apiService.tags+'/'+tag,{params:{
                user_id: this.userStore.userId,
                key: this.userStore.key
            }})
        }else {
            return await axios.get(this.apiService.tags+'/'+tag)
        }
    }
}