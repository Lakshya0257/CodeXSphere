import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class UserStoreService{

    constructor(){
        if(localStorage.getItem('userId')!==null && localStorage.getItem('key')!==null && localStorage.getItem('avatar')!==null && localStorage.getItem('username')!==null){
            this.userId=localStorage.getItem('userId')!;
            this.key=localStorage.getItem('key')!;
            this.updateData(localStorage.getItem('avatar')!,localStorage.getItem('username')!);
        }
    }

    private avatar = new BehaviorSubject<string>('Login Required');
    private username = new BehaviorSubject<string>('Login Required');
    avatar$ = this.avatar.asObservable();
    username$ = this.username.asObservable();
    
    public key : string = "";
    public userId : string = "";

    updateData(avatar: string, username: string){
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("username", username);
        this.avatar.next(avatar);
        this.username.next(username);
    }

    resetStore(){
    localStorage.removeItem('avatar');
    localStorage.removeItem('userId');
    localStorage.removeItem('key');
    localStorage.removeItem('username');
    this.key="";
    this.userId="";
    this.avatar=new BehaviorSubject<string>('Login Required');;
    this.username=new BehaviorSubject<string>('Login Required');;
    }
}