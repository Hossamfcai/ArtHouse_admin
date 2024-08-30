import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = 'http://localhost:3000/admin/login';
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  constructor(private http: HttpClient, private _router: Router) {
    if (this.isLocalStorageAvailable) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        this.tokenSubject.next(token);
      }
    }
  }
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  login(email: string, password: string): Observable<any> {
    console.log(password);
    return this.http.post<any>(this.apiURL, { email, password }).pipe(
      tap((res) => {
        const token = res.token;
        console.log(token);
        if (token) {
          localStorage.setItem('accessToken', token);
          this.tokenSubject.next(token);
        }
      })
    );
  }
  logOut() {
    localStorage.removeItem('accessToken');
    this._router.navigate(['/login/loginForm']);
  }
}
