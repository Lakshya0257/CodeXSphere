import { Injectable } from "@angular/core";
import { ApiHelperService } from "../global-services/api/global_api_ref.service";
import axios from "axios";

@Injectable()
export class ProjectService {
    constructor(private apiHelper : ApiHelperService){}
  postBlog(data : string){
    console.log(data);
    const result = axios.post(this.apiHelper.project,JSON.parse(data));
    console.log(result);
  }
}
