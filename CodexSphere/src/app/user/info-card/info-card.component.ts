import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/global-services/store-service/user-service.service';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {
  isLogin: boolean = false;

  // img$: Observable<string> = new Observable<string>();
  // name$: Observable<string> = new Observable<string>();

  img: String = "";
  name: String = "";


  constructor(private userStore: UserStoreService , private router: Router){}

  ngOnInit(): void {
    // this.img$=this.userStore.avatar$;
    // this.name$=this.userStore.username$;

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
}
