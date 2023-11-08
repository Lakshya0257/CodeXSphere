import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-following-page',
  templateUrl: './following-page.component.html',
  styleUrls: ['./following-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FollowingPageComponent {
  data: any;
  constructor(private route: ActivatedRoute){
    this.data=this.route.snapshot.data['data'];
  }
}
