import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root'
})
export class ApiHelperService {

    //base urls
    project : string = "http://localhost:3000/blogs";
    user : string = "http://localhost:3000/user";
    login : string = "http://localhost:3000/user/login";
    signup : string = "http://localhost:3000/user/signup";
    tags : string = "http://localhost:3000/tags";

    
}