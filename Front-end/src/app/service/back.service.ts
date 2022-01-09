import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Back } from '../model/Back';
import { Observable } from 'rxjs';
import { BackKeys } from '../model/BackKeys';

@Injectable({
  providedIn: 'root'
})
export class BackService {

  constructor(private http: HttpClient) { }

  getAllKeys(): Observable<BackKeys[]>{
    return this.http.get<BackKeys[]>(
      'http://localhost:8080/task',
    );
  }

  getAllValue(key: String): Observable<Back>{
    return this.http.get<Back>(
      `http://localhost:8080/task/${key}`
    );
  }

}
