import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  // Metodo para obtener todos los posts
  getDataAllPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Metodo para obtener un post por su ID
  getDataPostById(id: number): Observable<any>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  

}