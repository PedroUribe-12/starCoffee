import { Injectable } from '@angular/core';
import { Portada } from '../modelos/portada';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortadaService {

  private colleccionPortada!: AngularFirestoreCollection<Portada>
  
  obtenerPortada(){
    return this.colleccionPortada.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())));
  }

  constructor(private db: AngularFirestore) {
    this.colleccionPortada = db.collection('portada');
  }

  editarPortada(idPortada:string, nuevosDatos:Portada, url?:string){
    if(url){
      nuevosDatos.imagen = url;
    }
    return this.colleccionPortada.doc(idPortada).update(nuevosDatos);
  }
}
