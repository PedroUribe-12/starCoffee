import { Injectable } from '@angular/core';
import {AngularFirestore ,AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Seccion1 } from '../modelos/seccion1';


@Injectable({
  providedIn: 'root'
})
export class Seccion1Service {

  private colleciciondeSeccion1: AngularFirestoreCollection<Seccion1>

  constructor(db:AngularFirestore) {
    this.colleciciondeSeccion1= db.collection('seccion1')
  }

  getSeccion1(){
    return this.colleciciondeSeccion1.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())));
  }
  
  editarSeccion1(idSeccion1:string, nuevosDatos:Seccion1, url?:string){

    if(url){
      nuevosDatos.imagen = url
    }
    return this.colleciciondeSeccion1.doc(idSeccion1).update(nuevosDatos)
  }


}
