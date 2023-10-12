import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { HelperService } from './global-services/helper/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private helperService: HelperService) {}

  ngAfterViewInit() {
    console.log(this.container);
    this.helperService.container = this.container;
  }

  title = 'CodexSphere';
}
