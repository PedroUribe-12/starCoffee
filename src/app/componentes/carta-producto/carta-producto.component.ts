import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from 'src/app/modelos/producto';

@Component({
  selector: 'app-carta-producto',
  templateUrl: './carta-producto.component.html',
  styleUrls: ['./carta-producto.component.scss']
})
export class CartaProductoComponent implements OnInit {
  usuario=false;
  lectura=true;
  editarVisible=false;
  eliminarVisible=false

  //Variables que le brindara el componente padre
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
  modalVisible(){
    if(this.editarVisible==false){
      this.mostrarModal.emit(false)
    }else if(this.editarVisible==true){
      this.mostrarModal.emit(true)
      this.productoEnviado.emit(this.productoEdicion)
    }
  }
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
