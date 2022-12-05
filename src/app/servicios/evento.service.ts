import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { map } from 'rxjs/operators';
import { Evento } from '../modelos/evento';
@Injectable({
  providedIn: 'root'
})
export class EventoService {
  //Declaramos la coleccion de que guardara los eventos
  private coleccionEvento!:AngularFirestoreCollection<Evento>;

  constructor(private db: AngularFirestore) {
    this.coleccionEvento = db.collection("evento")
   }
  //Obtenemos los eventos con filtros para recibir solo lo necesario
  obtenerEvento(){
    return this.coleccionEvento.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())));
  }
}
