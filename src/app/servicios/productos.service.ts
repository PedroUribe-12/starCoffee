import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { async } from '@firebase/util';
import { map } from 'rxjs/operators';
import { Producto } from '../modelos/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  //Declaramos la coleccion de que guardara los productos
  private coleccionProductos!: AngularFirestoreCollection<Producto>
  
 
  constructor(private db: AngularFirestore) {
    //Guardamos los productos en la variable
    this.coleccionProductos = db.collection('productos')
  } 
  //Obtenemos los productos con filtros para recibir solo lo necesario
  obtenerProductos(){
    return this.coleccionProductos.snapshotChanges().pipe(map(action => action.map(a=> a.payload.doc.data())));
  };
  //Metodo para crear los productos
  crearProducto(nuevoProducto:Producto, url:string) //Recibe los parametros del usuario
   {
    return new Promise(async (resolve, reject) => {
      try {
        //Usamos el metodo de firebase para crear un id aleatorio
        const id = this.db.createId();
        nuevoProducto.idProducto = id;
        nuevoProducto.imagen = url;
        const respuesta = await this.coleccionProductos.doc(id).set(nuevoProducto);
        resolve(respuesta)
      }
      //Se ejecuta en caso de no terminar correctamente la tarea.
      catch (error) {
        reject(error)
      }
    })
  };

  //Metodo para editar un producto seleccionado
  editarProducto(idProducto: string, nuevosDatos:Producto){
    //Usamos el metodo de firebase que permite actualizar un archivo.
    return this.coleccionProductos.doc(idProducto).update(nuevosDatos)
  }

  //Metodo para eliminar un producto seleccionado
  eliminarProducto(idProducto: string) {
    return new Promise(async(resolve, reject) => {
      try {
        const respuesta = await this.coleccionProductos.doc(idProducto).delete()
        resolve(respuesta)
      }
      catch (error) {
        reject(error)
      }
    }
    )

  }
}
