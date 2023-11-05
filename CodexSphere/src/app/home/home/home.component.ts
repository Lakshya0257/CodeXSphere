import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HomepageService } from '../home.service';
import { UserStoreService } from 'src/app/global-services/store-service/user-service.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation:ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit{

  data: any;
  isLogin: boolean = false;
  tags: string[] = [];

  constructor(private readonly homeService: HomepageService, private readonly userStore: UserStoreService){}

  async ngOnInit(): Promise<void> {
    if(this.userStore.userId!=="" && this.userStore.key!==""){
      this.isLogin=true;
    }
    console.log(this.data);
    this.data=((await this.homeService.getBlogs()).data)
    const tagData = await this.homeService.getTags();
    for(let i= 0; i<tagData.length; i++){
      this.tags.push(tagData[i].tag_name);
      if(i===5) break;
    }
    console.log(tagData);
    console.log(this.data);
  }

  
  selectedTag: string = 'All'; // Initially set to 'All'

  async selectTag(tag: string){
    if(tag!=="All"){
      this.data=(await this.homeService.getTagBlogs(tag)).data.blogs;
      console.log(this.data);
    }else{
      this.data=((await this.homeService.getBlogs()).data)
    }
    this.selectedTag = tag;
  }

  search = faSearch;
}
