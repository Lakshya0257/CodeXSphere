import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { ErrorService } from './error/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private errorService: ErrorService) {}

  ngAfterViewInit() {
    console.log(this.container);
    this.errorService.container = this.container;
  }

  title = 'CodexSphere';
}
