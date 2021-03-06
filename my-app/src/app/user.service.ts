import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable, pipe, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user';
import { Instructor } from './instructor';
import { Employee } from './employee';
import { Client } from './client';
import { CurrentUser } from './current-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public static employee: Employee;
  public static instructor: Instructor;
  public static client: Client;
  private appUrl = 'http://localhost:8080/RevatureSocial/';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<User> {
    if (username && password) {
      console.log(username);

      const trial =  new User;
      trial.username = username;
      trial.password = password;
      console.log(trial);
      const myJSON = JSON.stringify(trial);
      console.log(myJSON);
      return this.http.post(this.appUrl + 'login', myJSON, { headers: this.headers, withCredentials: true }).pipe(
        map(
          resp => {
            const user: CurrentUser = resp as CurrentUser;
            UserService.employee = user.employee;
            console.log(UserService.employee);
            UserService.client = user.client;
            UserService.instructor = user.instructor;
            return ( UserService.employee !== undefined) ? UserService.employee :
            (UserService.client !== undefined)
             ? UserService.client : UserService.instructor;
          }
        )
      );
    } else {
      // we are just checking to see if we're already logged in
      return this.http.get(this.appUrl + 'login', { withCredentials: true })
        .pipe(map(
          resp => {
            const user: CurrentUser = resp as CurrentUser;
            console.log('User: ' + user);
            if (user) {
              UserService.employee = user.employee;
              UserService.client = user.client;
              UserService.instructor = user.instructor;
            }
            return (UserService.employee != null) ? UserService.employee :
            (UserService.client != null) ? UserService.client : UserService.instructor;
          }
        ));
    }
  }
  loginCheck(): User {
    console.log(UserService.employee);
    this.http.get(this.appUrl + 'login', { withCredentials: true })
        .pipe(map(
          resp => {
            let curuser: CurrentUser = resp as CurrentUser;
            console.log('User: ' + curuser.employee);
            if (curuser) {
              UserService.employee = curuser.employee;
              console.log(UserService.employee);
              console.log(curuser.employee);
              UserService.client = curuser.client;
              UserService.instructor = curuser.instructor;
            }
            curuser = null;
          }
        ));
        return (UserService.employee != null) ? UserService.employee :
        (UserService.client != null) ? UserService.client : UserService.instructor;
    }


  logout(): Observable<Object> {
    return this.http.delete(this.appUrl + 'login', { withCredentials: true }).pipe(
      map(success => {
        console.log('logout');
        UserService.employee = null;
        UserService.client = null;
        UserService.instructor = null;
        return success;
      })
    );
  }


  getInstructor(): Instructor {
    return UserService.instructor;
  }
  getEmployee(): Employee {
    console.log('getEmp');
    console.log(UserService.employee);
    return UserService.employee;
  }
  getClient(): Client {
    return UserService.client;
  }
  isEmployee() {
    return (UserService.employee !== undefined && UserService.employee !== null);
  }
  isInstructor() {
    return (UserService.instructor !== undefined && UserService.instructor !== null);
  }
  isClient() {
    return (UserService.client !== undefined && UserService.client !== null);
  }
}
