import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = 'https://fakestoreapi.com/users';

  constructor(private http: HttpClient) { }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        map(users => users.map(this.transformUser))
      );
  }

  private transformUser(user: any):any {
    return{
      id: user.id,
      name: `${user.name.firstname} ${user.name.lastname}`,
      address: `${user.address.city} ${user.address.street}`
    }
  }

}
