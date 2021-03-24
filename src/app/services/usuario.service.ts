import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { catchError, map, tap } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
  }

  validarToken() {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/users/me`, this.headers)
      .pipe(
         map( resp => true),
         //el catch es para no romper el siclo el of crea un nuevo observable
         // video 174
         catchError( error => of(false))
      );
    
  }

  crearUsuario( formData: RegisterForm ) {
    return this.http.post(`${ base_url }/users`, formData, this.headers );
  }

  login( formData: LoginForm ) {
    const grant_type = 'password';
    const  client_id = '1'; // Your client id
    const client_secret = 'egvcdDgAQ6JUqJtqpFQYEdfZdcLvSvmjQdug5mZ0'; // Your secret
    const username = formData.email;
    const password = formData.password;

    const body = new HttpParams()
          .append('grant_type', grant_type)
          .append('client_id', client_id)
          .append('client_secret', client_secret) 
          .append( 'username',  username)
          .append( 'password', password);


    return this.http.post(`${ base_url }/oauth/token`, body )
                .pipe(
                  tap((resp:any ) => {
                    localStorage.setItem('token', resp.access_token);
                  })
                );
  }
}
