import { Injectable } from "@angular/core";
import { UserStoreService } from "../global-services/store-service/user-service.service";
import { ApiHelperService } from "../global-services/api/global_api_ref.service";
import axios from "axios";

@Injectable()
export class LikeService{
    constructor(private userStore: UserStoreService, private apiHelper: ApiHelperService){}

    async getLikedBlogs(){
        return (await axios.get(this.apiHelper.liked_blogs,{params:{
            user_id: this.userStore.userId,
            key: this.userStore.key
        }})).data
    }
}