import { Injectable } from '@angular/core';
import { Seccion2 } from '../modelos/seccion2';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Seccion2Service {

  //creamos la propiedad privada colleccionSeccion2 de tipo AngularFirestoreCollection<Portada>
  private colleccionSeccion2!: AngularFirestoreCollection<Seccion2>
  
  //Creamos el metodo obtenerSeccion2
  obtenerSeccion2(){
    //Este metodo nos retornara un observable de los datos filtrados de la colleccion
    return this.colleccionSeccion2.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())));
  }

  constructor(/* Creamos la propiedad db de tipo AngularFirestore */private db: AngularFirestore) {
    //Asignamos a colleccionSeccion2 el nombre de la colleccion a la que tiene que hacer enfasis
    this.colleccionSeccion2 = db.collection('seccion2');
  }

  //Creamos el metodo editarSeccion2 que recibira por parametros idSeccion2 de tipo string, nuevosDatos de tipo Seccion2 y la url de tipo string que sera opcional
  editarSeccion2(idColleccion2:string, nuevosDatos:Seccion2, url?:string){
    //si recibe una url entrara al if
    if(url){
      //la url recibida se asignara a los nuevosDatos.imagen
      nuevosDatos.imagen = url;
    }
    //Actualizaremos la base de datos con los nuevos datos
    return this.colleccionSeccion2.doc(idColleccion2).update(nuevosDatos);
  }
}
