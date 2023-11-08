import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root'
})
export class ApiHelperService {

    //base urls
    blogs : string = "http://localhost:3000/blogs";
    delete_blog: string = "http://localhost:3000/blogs/delete/";
    profile_blogs: string = "http://localhost:3000/blogs/user"
    user : string = "http://localhost:3000/user";
    follow_user : string = "http://localhost:3000/user/follow/";
    login : string = "http://localhost:3000/user/login";
    signup : string = "http://localhost:3000/user/signup";
    create_profile : string = "http://localhost:3000/user/create";
    update_profile : string = "http://localhost:3000/user/update";
    tags : string = "http://localhost:3000/blogs/tags";
    blog_like : string = "http://localhost:3000/blogs/like";
    comment : string = "http://localhost:3000/blogs/comments";
    following_blogs= "http://localhost:3000/blogs/followings";
    liked_blogs= "http://localhost:3000/blogs/liked";

    
}