import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUtilService {

  constructor(private http: HttpClient) { }

  public getCities() {
    return this.http.get<any[]>("../assets/util/codice-catastale.json").pipe(
      map(cities => cities.sort((a, b) => a.descrizione.localeCompare(b.descrizione)))
    );
  }

  public getDispariChar() {
    return this.http.get<any[]>("../assets/util/tab-caratteri-dispari.json");
  }

  public getPariChar() {
    return this.http.get<any[]>("../assets/util/tab-caratteri-pari.json");
  }

  public getCharCodifica() {
    return this.http.get<any[]>("../assets/util/tab-codifica-cin.json");
  }
}