import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref, UploadResult, uploadString, deleteObject  } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class AlmacenamientoService {
  private storage = getStorage();//obtenemos las referencias del storage y la guardamos en la variable privada storage

  private respuesta!: UploadResult;

  constructor() { 

  }

  async subirImagen(nombre: string, imagen: any){
    try{
      let referenciaImagen = ref(this.storage,'seccion2/'+ nombre);// Guardamos la ruta donde se va a subir la imagen dentro del storage, dentro referenciaImagen
      this.respuesta = await uploadString(referenciaImagen,/* URL de la imagen */imagen,/* Formato */'data_url').then(resp => {
        return resp;
      })
      return this.respuesta;
    }
    catch(error){
      console.log(error)
      return this.respuesta
    }
  }

  obtenerUrlImagen(respuesta:UploadResult){
    return getDownloadURL (this.respuesta.ref);//utlizamos el metodo getDowloadURL para obtener la URL de la imagen guardada en el storage 
  } 

  eliminarImagen(urlImagen?:string){
    let referenciaImagen = ref(this.storage, urlImagen); 
    deleteObject(referenciaImagen).then(resp =>{
      alert('La imagen se elimino con éxito');
    })
    .catch(err => {
      alert('No se pudo eliminar la imagen. Error:'+err);
    })
  } 
}
