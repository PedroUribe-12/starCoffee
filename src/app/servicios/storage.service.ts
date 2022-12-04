import { Injectable } from '@angular/core';
import {getStorage, uploadString, ref, UploadResult, getDownloadURL, deleteObject, } from "firebase/storage"

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private respuesta:UploadResult

  private storage = getStorage() //obtenemos referencia al storage
  constructor() { }

  //creamos metodo para subir la imagen
  async subirImagen(nombre:string, imagen:any){ 
    try{
      let referenciaImagen = ref(this.storage, 'secciones/' +nombre) //toma como referencia en que lugar se va a gurardar la imagen y su nombre
      this.respuesta= await uploadString(referenciaImagen, imagen, 'data_url')//creo la variable donde se va a guardar la imagen
      .then(res=>{
        return res
      })
      return this.respuesta
    }
    catch(error){
      console.log(error)
      return this.respuesta
    }
  }

  //creamos el metodo para obtener la url del storage
  obtenerUrlIMagen(respuesta:UploadResult){
    return getDownloadURL (respuesta.ref) //nos dvuelve la url de la imagen con firestore con la funcion "getDownloadURL"
  }

  deleteImagen(urlImagen:string){
    let referenciaImagen= ref(this.storage, urlImagen)
    deleteObject(referenciaImagen)
    .then(resp =>{
      alert("la imagen fue eliminada con exito")

    })
    .catch(err=>{
      alert("no se pudo subir la imagen. Errro: " +err)
    })
  }
}
