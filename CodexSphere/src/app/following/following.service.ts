import { Injectable } from "@angular/core";
import { UserStoreService } from "../global-services/store-service/user-service.service";
import { ApiHelperService } from "../global-services/api/global_api_ref.service";
import axios from "axios";

@Injectable()
export class FollowingService{
    constructor(private userStore: UserStoreService, private apiHelper: ApiHelperService){}

    async getFollowingBlogs(){
        return (await axios.get(this.apiHelper.following_blogs,{params:{
            user_id: this.userStore.userId,
            key: this.userStore.key
        }})).data
    }
}