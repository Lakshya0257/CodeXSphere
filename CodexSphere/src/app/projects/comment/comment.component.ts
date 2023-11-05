import { Component } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  constructor(private blogService: ProjectService){}

  postComment(){
    
  }
}
