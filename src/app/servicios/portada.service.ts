import { Injectable } from '@angular/core';
import { Portada } from '../modelos/portada';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortadaService {

  //creamos la propiedad privada colleccionPortada de tipo AngularFirestoreCollection<Portada>
  private colleccionPortada!: AngularFirestoreCollection<Portada>
  
  //Creamos el metodo obtenerPortada
  obtenerPortada(){
    //Este metodo nos retornara un observable de los datos filtrados de la colleccion
    return this.colleccionPortada.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())));
  }

  constructor(/* Creamos la propiedad db de tipo AngularFirestore */private db: AngularFirestore) {
    //Asignamos a colleccionPortada el nombre de la colleccion a la que tiene que hacer enfasis
    this.colleccionPortada = db.collection('portada');
  }

  //Creamos el metodo editar portada que recibira por parametros idPortada de tipo string, nuevosDatos de tipo Portada y la url de tipo string que sera opcional
  editarPortada(idPortada:string, nuevosDatos:Portada, url?:string){
    //si recibe una url entrara al if
    if(url){
      //la url recibida se asignara a los nuevosDatos.imagen
      nuevosDatos.imagen = url;
    }
    //Actualizaremos la base de datos con los nuevos datos
    return this.colleccionPortada.doc(idPortada).update(nuevosDatos);
  }
}
