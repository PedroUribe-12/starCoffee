import { Injectable } from '@angular/core';
import {AngularFirestore ,AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Seccion3 } from '../modelos/seccion3';
@Injectable({
  providedIn: 'root'
})
export class Seccion3Service {


  private collecicionSeccion3: AngularFirestoreCollection<Seccion3>

  constructor(db:AngularFirestore) {
    this.collecicionSeccion3= db.collection('seccion3')
  }

  obtenerSeccion3(){
    return this.collecicionSeccion3.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())));
  }
  
  editarSeccion3(idSeccion3:string, nuevosDatos:Seccion3, url?:string){
    if(url){
      nuevosDatos.imagen = url
    }
    return this.collecicionSeccion3.doc(idSeccion3).update(nuevosDatos)
  }

}
