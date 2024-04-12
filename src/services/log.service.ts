import { Log } from './../models/log';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  auth: string = "auth";
  isLogged$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  public logUser(l: Log) {
    return this.http.post("http://localhost:3000/checkLog", l).pipe(
      map((res) => {
        console.log(res);
        localStorage.setItem(this.auth, res.toString());
        this.checkAccess();
        return res;
      })
    )
  }

  public checkAccess() {
    let auth = localStorage.getItem(this.auth);
    auth == "true" ? this.isLogged$.next(true) : this.isLogged$.next(false);
  }

  public logoutUser() {
    localStorage.setItem("auth", "false");
    this.isLogged$.next(false);
  }
}
