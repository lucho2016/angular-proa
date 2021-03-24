import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'  ]
})
export class LoginComponent {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email] ],
    password: ['', Validators.required ],
    remember: [false]
  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService ) {
   }

  login(){
    this.formSubmitted = true;

    if ( this.loginForm.invalid  ) {
      return;
    } 

   this.usuarioService.login( this.loginForm.value )
     .subscribe( resp => {
        if ( this.loginForm.get('remember').value ) {
          localStorage.setItem('email', this.loginForm.get('email').value );
        }else{
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/');

     }, (err) => {
        Swal.fire('Error', err.error.error_description ,'error');
     })
  }

  campoNoValido( campo: string ): boolean{
    if ( this.loginForm.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }


}
