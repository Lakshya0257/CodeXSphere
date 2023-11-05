import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ProjectContainerComponent } from './project-container/project-container.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomepageService } from './home.service';


console.log('Home module loaded')
@NgModule({
    declarations: [
        HomeComponent
    ],
    providers: [HomepageService],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FontAwesomeModule,
        ProjectContainerComponent
    ]
})
export class HomeModule { }
