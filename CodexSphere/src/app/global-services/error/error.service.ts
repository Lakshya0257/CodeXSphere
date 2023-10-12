import { Injectable, ViewChild, ViewContainerRef } from "@angular/core";
import { SnackbarComponent } from "../../snackbar/snackbar.component";
import { HelperService } from "../helper/helper.service";

@Injectable({providedIn:'root'})
export class ErrorService {
    constructor(private helperService: HelperService){
        console.log('Error service initialized');
    }

    

    checkPassword(pass: string , conf_pass:string) : string{
        if(pass!==conf_pass){
            this.helperService.showSnackbar("Passwords do not match! Please retype your password");
            return "Error"
        }else{
            return "Success"
        }
    }

    
  }