import { Injectable } from "@angular/core";
import { ApiHelperService } from "../global-services/api/global_api_ref.service";
import axios from "axios";
import { MatDialog } from "@angular/material/dialog";
import { CommentComponent } from "./comment/comment.component";
import { UserStoreService } from "../global-services/store-service/user-service.service";
import { Router } from "@angular/router";

@Injectable()
export class ProjectService {
    constructor(private apiHelper : ApiHelperService, private userStore: UserStoreService, private router: Router){}

  async postBlog(data : string){
    // console.log(data);
    const result = await axios.post(this.apiHelper.blogs,JSON.parse(data));
    console.log(result);
    window.history.back();
  }

  async updateBlog(data: string, blogId: string){
    console.log(data);
    const result = await axios.post(this.apiHelper.blogs+'/update/'+blogId,JSON.parse(data));
    console.log(result);
    window.history.back();
  }

  async getTags(){
    const result = await axios.get(this.apiHelper.tags);
    console.log(result);
    return result['data'];
  }

  async getBlog(blogId : string){
    const result = await axios.get(this.apiHelper.blogs+"/"+blogId, this.userStore.userId!==""? {
      params:{
        user_id: this.userStore.userId,
        key: this.userStore.key
    }
    }: undefined);

    return result.data;
  }

  async postComment(blog_id : string, comment : string){
    if(this.userStore.userId==="" || this.userStore.key===""){
      this.router.navigate(['/login']);
      return;
  }
    const result = await axios.post(this.apiHelper.comment+'/'+blog_id,{
      user_id: this.userStore.userId,
      key: this.userStore.key,
      comment: comment
    });
    return result.data;
  }

  async getComments(blog_id : string){
    const result = await axios.get(this.apiHelper.comment+'/'+blog_id);
    return result.data;
  }

  async deleteComment(comment_id : string){
    console.log(comment_id);
    const result = await axios.post(this.apiHelper.comment+'/delete/'+comment_id,{
      user_id: this.userStore.userId,
      key: this.userStore.key,
    });
    console.log(result)
    return 'deleted';
  }

  async deleteBlog(blogId: string){
    return await axios.delete(this.apiHelper.delete_blog+blogId,{
      params:{
        user_id: this.userStore.userId,
        key: this.userStore.key,
      }
    })
  }
}
