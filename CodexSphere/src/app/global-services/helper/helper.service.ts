import { Injectable, ViewContainerRef } from "@angular/core";
import { SnackbarComponent } from "src/app/snackbar/snackbar.component";

@Injectable({
    providedIn:'root'
}) 
export class HelperService{
    container : ViewContainerRef | undefined;
    
    showSnackbar(value:string){
        const ref=this.container?.createComponent(SnackbarComponent);
        ref!.instance.value=value;
        setTimeout(()=>{
            this.container?.clear();
        },3000)
    }
}