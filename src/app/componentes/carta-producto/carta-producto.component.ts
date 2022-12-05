import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from 'src/app/modelos/producto';

@Component({
  selector: 'app-carta-producto',
  templateUrl: './carta-producto.component.html',
  styleUrls: ['./carta-producto.component.scss']
})
export class CartaProductoComponent implements OnInit {
  //Declaracion de variables
  usuario=false;
  lectura=true;
  editarVisible=false;
  eliminarVisible=false

  //Variables que le brindara el componente padre y viceversa
  @Input() admin:boolean=false;
  @Input() nombreProducto:string='';
  @Input() imagenProducto:string='';
  @Input() puntuacionProducto:string='0';
  @Input() descripcionProducto:string='';
  @Output() mostrarModal = new EventEmitter<boolean>();
  @Output() mostrarEliminar = new EventEmitter<boolean>();
  @Input() idProducto!:string
  @Output() productoEnviado = new EventEmitter<Producto>();
  @Output() productoEliminado = new EventEmitter<Producto>();

  productoEdicion!:Producto

  //Metodo para enviarle un valor al componente padre. En este caso para editar un producto
  modalVisible(){
    if(this.editarVisible==false){
      this.mostrarModal.emit(false)
    }else if(this.editarVisible==true){
      this.mostrarModal.emit(true)
      this.productoEnviado.emit(this.productoEdicion)
    }
  }
    //Metodo para enviarle un valor al componente padre. En este caso para eliminar un producto
  eliminar(){
    if(this.eliminarVisible==false){
      this.mostrarEliminar.emit(false)
    }else if(this.eliminarVisible==true){
      this.mostrarEliminar.emit(true)
      this.productoEliminado.emit(this.productoEdicion)
    }
  }
  constructor() {
    
   }

  ngOnInit(): void {
    this.productoEdicion={
      nombre:this.nombreProducto,
      imagen:this.imagenProducto,
      puntuacion:parseInt(this.puntuacionProducto) ,
      descripcion:this.descripcionProducto,
      idProducto:this.idProducto
    }
  }

}
