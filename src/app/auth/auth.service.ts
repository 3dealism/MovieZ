import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

import {AuthData} from './auth-data.model';

@Injectable({providedIn: 'root'})


export class AuthService {

  private isAuthenticated = false;
  private token?: string;
  private tokenTimer: any;
  private userId?: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getToken() {
    return this.token;
  }

  /**
   * Confirms Authentication Status
   * @params {boolean} isAuthenticated Checks if a user is logged in
   */
  getIsAuth() {
    return this.isAuthenticated;
  }

  /**
   * returns current userId
   * @params {string} userId
   */
  getUserId() {
    return this.userId;
  }

  /**
   * returns authListener
   * @params {boolean} authStatusListener
   */
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  /** Creates a user and posts them to another function
   * Navigates the user back after successful login
   * @params {string} email
   * @params {string} password
   */
  createUser(email: string, password: string) {
    const authData: AuthData = {email, password};
    this.http
      .post('http://localhost:3000/api/user/signup', authData)
      .subscribe(response => {
        console.log(response);
        console.log('auth service reached on create user');
        this.login(email, password);
        this.router.navigate(['/']);
      });
  }

  /**
   * Logs a  user in and checks the validity of their login details
   * In case of success, a timer is set until the user is logged out again (1 hour)
   * @params response checks if the
   * @params {string} email
   * @params {string} password
   *
   * @example AuthData = {
   *   email = "garth.greenhand@thrones.com",
   *   password = "Password123"
   * }
   */
  login(email: string, password: string) {
    const authData: AuthData = {email, password};
    this.http
      .post<{ token: string; expiresIn: number, userId: string }>(
        'http://localhost:3000/api/user/login',
        authData
      )
      .subscribe(response => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(['/']);
          }
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  /**
   * Automatically logs in a user on page reload, sets timer for tokenvalidity
   * @params {boolean} isAuthenticated
   */
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log(expiresIn / 1000 + 'seconds left before logout');
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  /**
   *  This function a user out and clreas the token timer
   *  @params token Login Token that gets revoked on logout
   *
   */
  logout() {
    this.token = 'revoked'; // prior null impossible without casting
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = 'revoked'; // prior null impossible without casting
    this.router.navigate(['/']);
  }

  /**
   *  This function sets the Authentication timer, which is responsible for keeping the user logged in
   *  @param tokenTimer Login Token that gets set on milliseconds in this function
   *
   *  @example
   *
   *  setAuthtimer(500)
   *
   */
  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  /**
   *  This function sets the components locally
   *  @params token Login Token that gets set on milliseconds in this function
   *  @params expirationDate
   *  @params userId
   *  @example
   *
   *  saveAuthData("29385682egh29be497f7w9gfw", 5000, "foqh37fh9724g9qhefg")
   *
   */
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  /**
   * This function removes the three components token expiration and userId fomr local storage
   *
   */
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  /**
   *  This function gets the components fomr local storage
   *  @params token Login Token
   *  @params expirationDate
   *  @params userId
   *  @example
   *
   *  @returns null if there is no token or expiration date, otherwise returns token, expiration date and userId
   *
   */
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return null;
    }
    return {
      token, // : token,
      expirationDate: new Date(expirationDate),
      userId // : userId
    };
  }
}
