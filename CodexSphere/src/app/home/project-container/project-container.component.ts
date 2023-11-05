import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faComment , faBookmark } from '@fortawesome/free-regular-svg-icons';
import { HomepageService } from '../home.service';
import { BlogCardService } from 'src/app/standalone/services/blog.service';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone:true,
  imports:[FontAwesomeModule,CommonModule]
})
export class ProjectContainerComponent {
  constructor(private router: Router, private blogService: BlogCardService){}
  heart=faHeart;
  comment=faComment;
  bookmark=faBookmark;

  @Input('thumbnail') thumbnail="";
  @Input('creator') creator="";
  @Input('username') username="";
  @Input('creator_id') creator_id="";
  @Input('title') title="";
  @Input('likes') likes=0;
  @Input('tags') tags=[];
  @Input('blogId') blogId="";
  @Input('liked') liked? : boolean;

  readmore(){
    this.router.navigateByUrl('/blog/'+this.blogId)
  }

  async like(){
    if(this.liked!==null){
      console.log(await this.blogService.likeBlog(this.blogId,this.creator_id))
      if(this.liked===true){
        this.liked=false;
        this.likes--;
      }else{
        this.liked=true;
        this.likes++;
      }
    }else{
      this.router.navigateByUrl('/login');
    }
  }
}
