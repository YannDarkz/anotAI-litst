import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, Subject } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Iuser } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //  cancel


  private apiUrl = 'http://localhost:3000/users'

  private errorSubject = new Subject<string>();
  error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => users[0] || null),
      catchError(error => {
        const errorMsg = 'Não foi possível buscar o usuário. Verifique sua conexão.';
        this.errorSubject.next(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  addUser(user: Iuser): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user).pipe(
      catchError(error => {
        const errorMsg = 'Não foi possível adicionar o usuário. Verifique sua conexão.';
        this.errorSubject.next(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  saveAutorizedUser(userData: Iuser): Observable<Iuser> {
    return this.getUserByEmail(userData.email).pipe(
      switchMap(existingUser => {
        if (existingUser) {
          return of(existingUser);
        } else {
          return this.addUser(userData);
        }
      }),
      catchError(error => {
        const errorMsg = 'Não foi possível salvar os dados do usuário. Verifique sua conexão.';
        this.errorSubject.next(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
