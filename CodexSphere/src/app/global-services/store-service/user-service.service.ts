import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class UserStoreService{

    constructor(){
        if(localStorage.getItem('username')!==null && localStorage.getItem('avatar')!==null){
            console.log(localStorage.getItem('avatar')!);
            this.username.next(localStorage.getItem('username')!);
            this.avatar.next(localStorage.getItem('avatar')!);
            this.userId=localStorage.getItem('userId')!;
            this.key=localStorage.getItem('key')!;
        }
    }

    private avatar = new BehaviorSubject<string>('Login Required');
    private username = new BehaviorSubject<string>('Login Required');
    avatar$ = this.avatar.asObservable();
    username$ = this.username.asObservable();
    
    public key : string = "";
    public userId : string = "";

    updateData(avatar: string, username: string){
        this.avatar.next(avatar);
        this.username.next(username);
    }
}