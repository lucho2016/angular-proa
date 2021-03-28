import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Usuario } from 'src/app/models/usuario.model';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';






@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imagen_mod: string;
  public imgTemp: any = null;

  base_url = environment.base_url


  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService,
              ) { 

    this.usuario = usuarioService.usuario;

    if(this.usuario.imagen =='http://127.0.0.1:8000/img'){
                        console.log('dentro');
                        this.imagen_mod = '../../../assets/images/no-img.jpg';
                    }else{
                        this.imagen_mod = this.usuario.imagen;
                    } 
  }

  ngOnInit( ): void {

    

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      correo: [this.usuario.correo, [ Validators.required, Validators.email ]],
      esAdministrador: [this.usuario.esAdministrador, Validators.required ],
      imagen: [this.usuario.imagen, Validators.required]
    });
    
    if( !this.usuario.esAdministrador ) {
      this.perfilForm.get('esAdministrador').disable();
    }

   }

   actualizarPerfil(){
     //console.log(this.perfilForm.value);
     this.usuarioService.actualizarPerfil( this.perfilForm.value)
         .subscribe( resp => {
           console.log(resp)
           const{ nombre, email, imagen, esAdministrador } = this.perfilForm.value;
           this.usuario.nombre = nombre;
           this.usuario.correo = email;
           this.usuario.esAdministrador= esAdministrador;
           this.usuario.imagen= imagen;

          if( this.usuario.esAdministrador == 'false' ) {
            this.perfilForm.get('esAdministrador').disable();
          }

           
           
           Swal.fire('Operación Exitosa', 'Se realizaron los cambios correctamente' ,'success');
         }, (err) => {
           console.log(err)
          Swal.fire('Error', err.error.error ,'error');
       });
   }

   ayuda(event){
    
      Swal.fire('Error', 'Solo usuarios administradores pueden modificar este campo' ,'error');
    
   }

   cambiarImagen( file: File ) {
     this.imagenSubir = file;

    if (!file) {
       return this.imgTemp = null;
    }

     const reader = new FileReader();
     reader.readAsDataURL( file );

     reader.onloadend = () => {
       this.imgTemp = reader.result;
     }
   }

   subirImagen(){
     this.fileUploadService
         .actualizarFoto( this.imagenSubir, 'users', this.usuario.identificador )
         .then( img => {
           this.usuario.imagen = this.base_url + '/img/' + img;
           Swal.fire('Operación Exitosa', 'Imagen del usuario actualizada','success');
          }, (err) => {

           Swal.fire('Error','No se pudo subir la imagen' ,'error');
        });
   }

}
