import { Injectable } from "@angular/core";
import { ApiHelperService } from "../global-services/api/global_api_ref.service";
import axios from "axios";

@Injectable()
export class ProjectService {
    constructor(private apiHelper : ApiHelperService){}

  async postBlog(data : string){
    console.log(data);
    const result = await axios.post(this.apiHelper.project,JSON.parse(data));
    console.log(result);
  }

  async getTags(){
    const result = await axios.get(this.apiHelper.tags);
    console.log(result);
    return result['data'];
  }

  // async postTags(tags: string){
  //   const result = await axios.post(this.apiHelper.tags,JSON.parse(tags));
  //   console.log(result);
  // }
}
