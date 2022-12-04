import { Injectable } from '@angular/core';
import {AngularFirestore ,AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Historia } from '../modelos/historia';

@Injectable({
  providedIn: 'root'
})
export class HistoriaService {
  //Declaramos la coleccion que cuarda la historia
  private colleccionHistoria!: AngularFirestoreCollection<Historia>

  constructor(private db: AngularFirestore) { 
    this.colleccionHistoria =db.collection("historia")
  }

  //Obtenemos los eventos con filtros para recibir solo lo necesario
  obtenerHistoria(){
    return this.colleccionHistoria.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())));
  }

  editarHistoria(idHistoria:string, nuevosDatos:Historia){
    return this.colleccionHistoria.doc(idHistoria).update(nuevosDatos)
  }
}
