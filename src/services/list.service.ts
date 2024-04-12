import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  list: string[];

  constructor(private http: HttpClient) { }

  public getElements() {
    return this.http.get<string[]>("http://localhost:3000/getListElements").pipe(
      map(res => {
        return res;
      })
    )
  }

  public addElement(element: string) {
    return this.http.post("http://localhost:3000/addListElement", element).pipe(
      map(res => {
        return res;
      })
    )
  }

  public deleteElement(element: string) {

    let params = new HttpParams({fromObject: { element: element } });
    return this.http.delete("http://localhost:3000/removeListElement", { params }).pipe(
      map(res => {
        return res;
      })
    )
  }
}
