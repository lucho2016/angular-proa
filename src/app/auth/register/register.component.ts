import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'  ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['Fernando', Validators.required ],
    correo: ['test100@gmail.com', [Validators.required, Validators.email] ],
    password: ['123456', Validators.required ],
    password_confirmation: ['123456', Validators.required ],
    terminos: [ true, Validators.requiredTrue ],
  
  }, {
    validators: this.passwordsIguales('password', 'password_confirmation')
  });

  constructor( private fb: FormBuilder,
                private UsuarioService: UsuarioService ) { }

  crearUsuario() {
    this.formSubmitted = true;

    if ( this.registerForm.invalid  ) {
      return;
    } 
    
    
    this.UsuarioService.crearUsuario( this.registerForm.value )
      .subscribe( resp => {
        Swal.fire('Operación exitosa', 'Usuario creado correctamente!!' ,'success');
      }, (err) => {
            // 1 - Crea una matriz vacía para almacenar errores
            const errors = [];
             // 2 - compruebe si el objeto de error está presente en la respuesta
              if (err.error) {
                  // 3 - Empuje el mensaje de error principal a la matriz de errores
                  errors.push(err.error.error);
      
                    // 5 - Para cada propiedad de error (que es un campo de formulario
                    for (const property in err.error.error) {
                        // 6 - Extrae su matriz de errores
                        const propertyErrors: Array<string> = err.error.error[property];
              
                        // 7 - Empuje todos los errores de la matriz a la matriz de errores
                        propertyErrors.forEach(err => errors.push(err));
                     }
              }

              for (let mens of errors){
                  Swal.fire({
                  title: 'error', 
                  text: mens,
                  icon:'error',
                });
              }
      });
    
  }

  campoNoValido( campo: string ): boolean{
    if ( this.registerForm.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password_confirmation').value;

    if((pass1!==pass2) && this.formSubmitted ){
      return true;
    }else{
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passwordsIguales(pass1Name: string, pass2Name: string ) {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ noEsIgual: true })
      }


    }
  }
}
