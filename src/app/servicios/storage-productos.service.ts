import { Injectable } from '@angular/core';
import{getStorage, ref, uploadString, UploadResult, getDownloadURL, deleteObject} from 'firebase/storage'

@Injectable({
  providedIn: 'root'
})
export class StorageProductosService {
  private storage = getStorage()
  private respuesta!: UploadResult
    constructor() { }
    async subirImagen(nombre:string, imagen:any){
      try{
        let referenciaImagen = ref(this.storage,'productos/'+nombre)
        this.respuesta = await uploadString(referenciaImagen,imagen,'data_url')
        .then(resp=>{
          return resp
        })
        return this.respuesta
      }catch(error){
        console.log(error)
        return this.respuesta
    }
    }
    obtenerUrl(respuesta:UploadResult){
      return getDownloadURL(respuesta.ref)
    }
    eliminarImagen(refImagen:string){
      let referenciaImagen = ref(this.storage,refImagen)
      deleteObject(referenciaImagen)
      .then(resp=>{
        alert("La imagen fue eliminada con exito");
      })
      .catch(err=>{
        alert("No se pudo eliminar la imagen. Error: "+ err)
      })
    }
    
}
