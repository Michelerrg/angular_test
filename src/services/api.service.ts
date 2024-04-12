import { User } from './../models/User';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, of, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  user: User[];

  constructor(private http: HttpClient) {

  }

  public getUsers() {
    return this.http.get<User[]>("http://localhost:3000/getData").pipe(
      map(res => {
        return res;
      })
    )
  }

  public addUser(u: User) {
    return this.http.post("http://localhost:3000/addData", u).pipe(
      map(res => {
        return res;
      })
    )
  }

  public deleteUser(userId: string) {

    let params = new HttpParams({fromObject: { id: userId } });
    return this.http.delete("http://localhost:3000/removeData", { params }).pipe(
      map(res => {
        return res;
      })
    )
  }
}
