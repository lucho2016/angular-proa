import { environment } from '../../environments/environment.prod';


const base_url = environment.base_url;

export class Usuario {
    constructor(
        public nombre: string,
        public correo: string, 
        public password?: string,
        public esAdministrador?: string,
        public imagen?: string,
        public identificador?: string,
    ){}

    get imagenUrl() {
        if ( this.imagen ) {
            return `${this.imagen}`;
        }else{
            console.log(`${ base_url }/img/usuario/no-img.jpg`)
            return `${ base_url }/img/usuario/no-img.jpg`;
        }
    }
}