import { Injectable } from '@angular/core';
import {getStorage, uploadString, ref, UploadResult, getDownloadURL, deleteObject, } from "firebase/storage"

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private respuesta:UploadResult
  private respuestaS3:UploadResult
  private storage = getStorage() //obtenemos referencia al storage
  constructor() { }

  //creamos metodo para subir la imagen
  async subirImagenaSeccion1(nombre:string, imagen:any){ 
    try{
      let referenciaImagen = ref(this.storage, 'seccion1/' +nombre) //toma como referencia en que lugar se va a gurardar la imagen y su nombre
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


  async subirImagenaSeccion3(nombre:string, imagen:any){ 
    try{
      let referenciaImagen = ref(this.storage, 'seccion3/' +nombre) //toma como referencia en que lugar se va a gurardar la imagen y su nombre
      this.respuestaS3= await uploadString(referenciaImagen, imagen, 'data_url')//creo la variable donde se va a guardar la imagen
      .then(res=>{
        return res
      })
      return this.respuestaS3
    }
    catch(error){
      console.log(error)
      return this.respuestaS3
    }
  }

  //creamos el metodo para obtener la url del storage
  obtenerUrlIMagen(respuesta:UploadResult){
    return getDownloadURL (respuesta.ref) //nos dvuelve la url de la imagen con firestore con la funcion "getDownloadURL"
  }


  //creamos el metodo para obtener la url del storage
  obtenerUrlSeccion3(respuestaS3:UploadResult){
    return getDownloadURL (respuestaS3.ref) //nos dvuelve la url de la imagen con firestore con la funcion "getDownloadURL"
  }


  deleteImagen(urlImagen:string){
    let referenciaImagen= ref(this.storage, urlImagen)
    deleteObject(referenciaImagen)
    .then(resp =>{
      alert("Se actualizo la imagen")

    })
    .catch(err=>{
      alert("no se pudo subir la imagen. Errro: " +err)
    })
  }
}
