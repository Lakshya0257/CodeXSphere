import { Component, ViewEncapsulation } from '@angular/core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faComment , faBookmark } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProjectContainerComponent {
  heart=faHeart;
  comment=faComment;
  bookmark=faBookmark;
}
