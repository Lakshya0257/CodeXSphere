import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LikeComponent {
  data: any;
  constructor(private route: ActivatedRoute){
    this.data=this.route.snapshot.data['data'];
    console.log(this.data);
  }
}
