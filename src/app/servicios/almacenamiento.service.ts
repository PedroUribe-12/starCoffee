import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref, UploadResult, uploadString, deleteObject  } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class AlmacenamientoService {

  //obtenemos las referencias del storage y la guardamos en la variable privada storage
  private storage = getStorage();

  //Creamos la propiedad privada respuesta de tipo UploadResult que si o si se le debera asignar un valor más tarde
  private respuesta!: UploadResult;

  constructor() { 

  }

  //Creamos el metodo asincrono subirImagen que recibira como parametro un nombre de tipo string y una imagen de tipo any 
  async subirImagen(nombre: string, imagen: any){
    try{
      let referenciaImagen = ref(this.storage,'portada/'+ nombre);// Guardamos la ruta donde se va a subir la imagen dentro del storage, dentro referenciaImagen
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

  //Creamos el metodo obtenerUrlImagen que recibira por parametro: respuesta de tipo UploadResult
  obtenerUrlImagen(respuesta:UploadResult){
    return getDownloadURL (this.respuesta.ref);//utlizamos el metodo getDowloadURL para obtener la URL de la imagen guardada en el storage 
  } 

  //Creamos el metodo eliminarImagen que recibira por parametro opcionalmente la urlImagen que sera de tipo string
  eliminarImagen(urlImagen?:string){
    //Creamos la propiedad referenciaImagen y se le asignara la refrencia del storage más la urlImagen recibida por parametro
    let referenciaImagen = ref(this.storage, urlImagen); 

    //Se elimnara la imagen por su refrencia que se encuentra en refrenciaImagen
    deleteObject(referenciaImagen).then(resp =>{
      //luego se mostrara la siguiente alerta
      alert('Se actualizo la imagen');
    })
    //En caso contrario capturara el error
    .catch(err => {
      // luego lo mostrar dentro de la alerta
      alert('No se pudo eliminar la imagen. Error:'+err);
    })
  } 
}
