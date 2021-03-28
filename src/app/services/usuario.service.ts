import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { catchError, map, tap } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { of } from 'rxjs';

import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public usuario: Usuario;

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
        map((resp: any) => {
          //console.log(resp);
          const { identificador, nombre, correo, esAdministrador, imagen,
          } = resp.data;

          this.usuario = new Usuario( nombre, correo, '',esAdministrador, imagen, identificador );
          return true;
        }),
         //el catch es para no romper el siclo el of crea un nuevo observable
         // video 174
         catchError( error => of(false))
      );
    
  }

  crearUsuario( formData: RegisterForm ) {
    return this.http.post(`${ base_url }/users`, formData, this.headers );
  }

  actualizarPerfil( data: {email:string, nombre:string, identificador: string, esAdministrador: string, _method: string, imagen:string}) {
    data= {
      ...data,
      identificador: this.usuario.identificador,
      _method: 'PUT'
    };
    console.log(data)
    return this.http.post(`${ base_url }/users/${this.usuario.identificador}`, data, this.headers );
  }
  

  login( formData: LoginForm ) {
    const grant_type = 'password';
    const  client_id = '1'; // Your client id
    const client_secret = 'q48udv6hUHm952SG3IPwVYVlwkqpgEiN21tvZwKg'; // Your secret
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
