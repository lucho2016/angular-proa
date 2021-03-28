import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
      archivo: File,
      tipo: 'users',
      id: string

  ){

    try {

      const url = `${ base_url }/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('image', archivo);
      formData.append('_method', 'PUT');

      //fetch permite hacer peticiones javascript
      const resp = await fetch( url, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')||''
        },
        body: formData
      });

      const data = await resp.json();

      if ( data){
        return data.data.image;
      } else {
        console.log(data);
        return false
      }

    // return 'nombre de la imagen';
      
    } catch (error) {
      console.log(error);
      return false;
    }
  

  }
}
