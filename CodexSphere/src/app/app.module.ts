import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiHelperService } from './global-services/api/global_api_ref.service';
import { ErrorService } from './global-services/error/error.service';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { UserStoreService } from './global-services/store-service/user-service.service';
import { HelperService } from './global-services/helper/helper.service';

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
  providers:[ApiHelperService, ErrorService, UserStoreService, HelperService]
})
export class AppModule {}
