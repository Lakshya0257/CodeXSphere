import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiHelperService } from './api/global_api_ref.service';
import { ErrorService } from './error/error.service';
import { SnackbarComponent } from './snackbar/snackbar.component';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavBarModule,
    FontAwesomeModule,
    SnackbarComponent
  ],
  providers:[ApiHelperService, ErrorService]
})
export class AppModule {}
