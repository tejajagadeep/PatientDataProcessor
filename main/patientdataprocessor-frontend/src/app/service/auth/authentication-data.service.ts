import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from 'src/app/app.constants';
import { MessageResponse } from 'src/app/model/message-response';
import { UserDataService } from '../data/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationDataService {

  // USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username!: string
  public password!: string;

  messageResponse!: MessageResponse

  constructor(
    // private http: HttpClient,
    private httpClient: HttpClient,
    private userService: UserDataService
  ) { }

  authenticate(username: string, password: string) {
    return this.httpClient.post<any>(`${API_URL}/authenticate`, { username, password }).pipe(
      map(
        userData => {
          localStorage.setItem('authenticatedUser', username);
          let tokenStr = 'Bearer ' + userData.token;
          localStorage.setItem('token', tokenStr);
          return userData;
        }
      )

    );
  }

  getAuthenticatedToken() {
    return localStorage.getItem('token')
  }

  isUserLoggedIn() {
    // let user = localStorage.getItem('username')
    // console.log(!(user === null))
    // return !(user === null)
    let user = localStorage.getItem('authenticatedUser')
    let tokens = localStorage.getItem('token')
    if (user === null || tokens==null) return false
    return true
  }

  logOut() {
    localStorage.removeItem('authenticatedUser')
    localStorage.removeItem('token')
    // localStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    localStorage.removeItem('userRole')
  }

  // authenticationService(username: string, password: string): Observable<any> {
  //   return this.httpClient.get(`http://localhost:8093/project-management/basicauth`,
  //     { headers: { authorization: this.createBasicAuthToken1(username, password) } }).pipe(map((res) => {
  //       this.username = username;
  //       this.password = password;
  //       this.registerSuccessfulLogin1(username, password);
  //     }));
  // }

  createBasicAuthToken1(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin1(username: string, password: string) {
    localStorage.setItem('authenticatedUser', username)
    // localStorage.setItem('password',password)
  }

  logout1() {
    // localStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    // this.username = null;
    // this.password = null;
  }

  // isUserLoggedIn1() {
    // let user = localStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    // if (user === null) return false
    // return true
  // }

  isNavBar() {
    let user = localStorage.getItem('authenticatedUser')
    if (user) { return false } else {
      return true
    }
  }

  getLoggedInUserName() {
    let user = localStorage.getItem('authenticatedUser')
    if (user === null) return ''
    return user
  }



}
