import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/global-services/store-service/user-service.service';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  isLogin: boolean = false;


  img: String = "";
  name: String = "";


  constructor(private userStore: UserStoreService , private router: Router, public loaderService: LoaderService){}

  ngOnInit(): void {

    if(localStorage.getItem('key')!=null){
      this.isLogin=true;
    }

    this.userStore.username$.subscribe(value=>{
      console.log("Subscription reloaded");
      if(value==="Login Required"){
        this.isLogin=false;
      }else{
        this.name=value;
        this.isLogin=true;
      }
    });

    this.userStore.avatar$.subscribe(value=>{
      console.log("Subscription reloaded");
      if(value==="Login Required"){
        this.isLogin=false;
      }else{
        this.img=value;
        this.isLogin=true;
      }
    })
  }

  login(){
    this.router.navigate(['/login']);
  }

  navigate(route: string){
    if(route==='blog/new' || route==='following' || route==='liked'){
      if(this.userStore.userId==="" || this.userStore.key==="" || this.userStore.key===undefined || this.userStore.userId===undefined){
        this.router.navigate(['/login']);
        return;
      }
    }
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.router.url===route;
  }
  
  profile(){
    this.router.navigateByUrl('/profile/'+this.userStore.userId);
  }
}
