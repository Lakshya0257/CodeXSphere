import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import axios from "axios";
import { ApiHelperService } from "src/app/global-services/api/global_api_ref.service";
import { UserStoreService } from "src/app/global-services/store-service/user-service.service";


@Injectable({providedIn:'root'})
export class BlogCardService{
    constructor(private userStore: UserStoreService, private apiService: ApiHelperService, private router: Router){}
    async likeBlog(blog_id: string, liked_to:string){
        if(this.userStore.userId==="" || this.userStore.key===""){
            this.router.navigate(['/login']);
            return;
        }else{
            return await axios.post(this.apiService.blog_like,JSON.parse(JSON.stringify({
                user_id: this.userStore.userId,
                key: this.userStore.key,
                blog_id: blog_id,
                liked_to: liked_to
            })))
        }
    }
}