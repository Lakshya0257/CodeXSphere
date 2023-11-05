import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import EditorJS, { ToolConstructable, BlockToolConstructable, InlineToolConstructable } from '@editorjs/editorjs';
import { faComment , faBookmark } from '@fortawesome/free-regular-svg-icons';
import { ProjectService } from '../project.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommentComponent } from '../comment/comment.component';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import Header from '@editorjs/header';
// @ts-ignore
import SimpleImage from '@editorjs/simple-image';
// @ts-ignore
import CodeTool from '@editorjs/code';
// @ts-ignore
import InlineCode from '@editorjs/inline-code';
// @ts-ignore
import Embed from '@editorjs/embed';
import { BlogCardService } from 'src/app/standalone/services/blog.service';
import { UserStoreService } from 'src/app/global-services/store-service/user-service.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogComponent implements AfterViewInit,OnInit{

  constructor(private userStore: UserStoreService, private projectService: ProjectService, public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private blogService: BlogCardService){
    this.data = this.route.snapshot.data['blogData'];
  }
  async ngOnInit() {
    this.comments= await this.projectService.getComments(this.data.blog_id);
    console.log(this.comments);
  }


  @ViewChild('editor', { read: ElementRef })
  
  editorElement: ElementRef | undefined;

  comment= faComment;
  data: any;
  commentInput: string = "";
  comments: any;

  private editor: EditorJS | undefined;
  
  async ngAfterViewInit(){
    this.initializeEditor();
  }

  navigateToUser(user_id:string){
    this.router.navigateByUrl('/profile/'+user_id);
  }

  checkSameUser(user_id: string){
    return user_id===this.userStore.userId;
  }

  async deleteComment(comment_id:string){
    await this.projectService.deleteComment(comment_id);
    this.comments= await this.projectService.getComments(this.data.blog_id);
  }

  private initializeEditor() {
    this.editor = new EditorJS({
      minHeight: 200,
      holder: this.editorElement?.nativeElement,
      placeholder: 'Let`s start writing!',
      data: JSON.parse(this.data.body.body),
      readOnly: true,
      tools: {
        image: SimpleImage,
        header: {
          // @ts-ignore
          class: Header as InlineToolConstructable,
          inlineToolbar: true,
        },
        code: CodeTool,
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+M',
        },
        embed: {
          class: Embed,
          inlineToolbar: true,
          config: {
            services: {
              youtube: true,
              coub: true,
            },
          },
        },
      },
    });
  }

  async like(){
    if(this.data.liked!==null){
      console.log(await this.blogService.likeBlog(this.data.blog_id,this.data.user))
      if(this.data.liked===true){
        this.data.liked=false;
        this.data.total_likes--;
      }else{
        this.data.liked=true;
        this.data.total_likes++;
      }
    }else{
      this.router.navigateByUrl('/login');
    }
  }

  async addComment(event: KeyboardEvent){
    if(event.key==="Enter" && this.commentInput!==""){
      console.log(await this.projectService.postComment(this.data.blog_id, this.commentInput));
      this.commentInput = "";
      this.comments= await this.projectService.getComments(this.data.blog_id);
    }
  }

  editBlog(){
    this.router.navigateByUrl('/blog/update',{state:{
      data: this.data
    }})
  }

  formatTimeAgo(timestamp: string): string {
    const currentTime = new Date(); // Current time
    const previousTime = new Date(timestamp); // Convert the timestamp to a Date object
  
    // Convert previousTime to the local time zone
    const offset = currentTime.getTimezoneOffset();
    previousTime.setTime(previousTime.getTime() - offset * 60 * 1000);
  
    const elapsed = currentTime.getTime() - previousTime.getTime(); // Calculate the time difference in milliseconds
    const seconds = Math.floor(elapsed / 1000);
  
    if (seconds < 60) {
      return seconds + ' sec ago';
    }
  
    const minutes = Math.floor(seconds / 60);
  
    if (minutes < 60) {
      return minutes + ' min ago';
    }
  
    const hours = Math.floor(minutes / 60);
  
    if (hours < 24) {
      return hours + ' hr ago';
    }
  
    const days = Math.floor(hours / 24);
  
    if (days < 2) {
      return '1 day ago';
    }
  
    if (days < 30) {
      return days + ' days ago';
    }
  
    const months = Math.floor(days / 30);
  
    if (months < 12) {
      return months + ' months ago';
    }
  
    const years = Math.floor(months / 12);
    
    if (years === 1) {
      return '1 year ago';
    }
  
    return years + ' years ago';
  }

  async deleteBlog(){
    await this.projectService.deleteBlog(this.data.blog_id);
    this.router.navigateByUrl('/home');
  }
  


  // openDialog(): void {
  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.disableClose = true;
  //   dialogConfig.hasBackdrop = true;
  //   dialogConfig.enterAnimationDuration = 0;
  //   dialogConfig.closeOnNavigation = true;
  //   dialogConfig.autoFocus = false;


  //       this.dialog.open(CommentComponent,dialogConfig);
  // }
}
