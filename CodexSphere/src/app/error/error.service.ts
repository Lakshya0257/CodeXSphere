import { Injectable, ViewChild, ViewContainerRef } from "@angular/core";
import { SnackbarComponent } from "../snackbar/snackbar.component";

@Injectable({providedIn:'root'})
export class ErrorService {
    constructor(){
        console.log('Error service initialized');
    }

    container : ViewContainerRef | undefined;

    checkPassword(pass: string , conf_pass:string) : void{
        if(pass!==conf_pass){
            this.container?.createComponent(SnackbarComponent);
        }
    }
  }