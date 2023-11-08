import { Injectable, ViewContainerRef } from "@angular/core";
import axios from "axios";
import { LoaderService } from "src/app/loader/loader.service";
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

    constructor(private loadingService: LoaderService){
        // Add your Axios interceptor code here
        axios.interceptors.request.use(config => {
            // This code will run before each request
            console.log('Request is about to be made:', config);
            loadingService.isLoading.next(true);
            return config;
          });
      
          axios.interceptors.response.use(response => {
              loadingService.isLoading.next(false);
            // This code will run when a response is received
            console.log('Response received:', response);
            return response;
          }, error => {
              loadingService.isLoading.next(false);
            // This code will run if there is an error in the response
            console.error('Error in response:', error);
            this.showSnackbar(error.toString());
            throw error;
          });
    }
}