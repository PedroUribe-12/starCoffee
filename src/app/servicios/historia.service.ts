import { Injectable } from '@angular/core';
import {AngularFirestore ,AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Historia } from '../modelos/historia';

@Injectable({
  providedIn: 'root'
})
export class HistoriaService {
 
  //creamos la propiedad privada colleccionHistoria de tipo AngularFirestoreCollection<Portada>
  private colleccionHistoria!: AngularFirestoreCollection<Historia>
  
  //Creamos el metodo obtenerPortada
  obtenerHistoria(){
    //Este metodo nos retornara un observable de los datos filtrados de la colleccion
    return this.colleccionHistoria.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())));
  }

  constructor(/* Creamos la propiedad db de tipo AngularFirestore */private db: AngularFirestore) {
    //Asignamos a colleccionHistoria el nombre de la colleccion a la que tiene que hacer enfasis
    this.colleccionHistoria = db.collection('historia');
  }

  //Creamos el metodo editar portada que recibira por parametros idPortada de tipo string, nuevosDatos de tipo Portada y la url de tipo string que sera opcional
  editarHistoria(idHistoria:string, nuevosDatos:Historia, url?:string){
    //si recibe una url entrara al if
    if(url){
      //la url recibida se asignara a los nuevosDatos.imagen
      nuevosDatos.imagenHistoria = url;
    }
    //Actualizaremos la base de datos con los nuevos datos
    return this.colleccionHistoria.doc(idHistoria).update(nuevosDatos);
  }
}
