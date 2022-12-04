import { Component, Input, OnInit, Output } from '@angular/core';
import { Producto } from 'src/app/modelos/producto';
import { ProductosService } from 'src/app/servicios/productos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageProductosService } from 'src/app/servicios/storage-productos.service';

@Component({
  selector: 'app-carrusel-de-cartas',
  templateUrl: './carrusel-de-cartas.component.html',
  styleUrls: ['./carrusel-de-cartas.component.scss']

})
export class CarruselDeCartasComponent implements OnInit {

  //Declaracion de variables
  productos:Producto[]=[]
  responsiveOptions:any=[]
  modalVisible=false
  imagen:string='';
  nombreImagen!:string
  productoSeleccionado!:Producto
  textoBoton!:string
  eliminarVisible=false;
  @Input() admin:boolean=false;

  //Declaracion del FormGroup para el formulario reactivo
  nuevoProducto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    puntuacion: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    imagen: new FormControl('')
  })
  mostrarModal(){
    this.modalVisible= true
    this.textoBoton= "Agregar Producto"
    console.log(this.admin)
  }
  mostrarModalEditar(valor:boolean){
    this.modalVisible= valor
    this.textoBoton = "Editar Producto"
  }
  //Inyeccion de los servicios
  constructor(private servicioProductos:ProductosService, private storage:StorageProductosService) {
    //Breakpoints para que el carrusel sea responsivo
    this.responsiveOptions = [
      {
        breakpoint: '1080px',
        numVisible: 3,
        numScroll: 3
    },
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '820px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '590px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  
  };

  ngOnInit(): void {
    this.servicioProductos.obtenerProductos().subscribe(producto =>{
      this.productos = producto
    } )
  };
  //Metodo para agregar productos mediante el formulario del modal
  async agregarProducto() {
    if (this.nuevoProducto.valid) {
      let nuevoProducto: Producto = {
        nombre: this.nuevoProducto.value.nombre!,
        puntuacion: this.nuevoProducto.value.puntuacion!,
        idProducto: '',
        descripcion: this.nuevoProducto.value.descripcion!,
        imagen: this.nuevoProducto.value.imagen!
      }
      this.storage.subirImagen(this.nombreImagen, this.imagen)
      .then(
        async res=>{
          this.storage.obtenerUrl(res).then(
            async url=>{
              await this.servicioProductos.crearProducto(nuevoProducto, url).then(producto => {
                alert('producto agragado')
                this.limpiarFormulario()
      })
        .catch(error => {
          alert('Ocurrio un error\nError: ' + error)
        })
            }
          )
        }
      )
      
    }else{
      alert('Falta completar algun espacio')
    }

  };
  //Metodo para subir la imagen y guardar su url
  cargarImagen(event:any){
    let archivo = event.target.files[0];
    let reader = new FileReader();
    if(archivo!=undefined){
      reader.readAsDataURL(archivo)
      reader.onloadend= ()=>{
        let url=reader.result
        if(url!=null){
          this.nombreImagen=archivo.name
          this.imagen = url.toString()
        }
      }
    }
  };
  //Metodo para limpiar los campos del formulario
  limpiarFormulario(){
    this.nuevoProducto.reset()
    this.imagen=''
  }
  //Metodo para llenar el formulario con los datos del producto seleccionado
  inputsEditar(productoSeleccionado:Producto){
    this.productoSeleccionado=productoSeleccionado
    this.nuevoProducto.setValue({
      nombre:productoSeleccionado.nombre,
      puntuacion: productoSeleccionado.puntuacion,
      descripcion: productoSeleccionado.descripcion,
      imagen:productoSeleccionado.imagen
    })
    console.log(this.productoSeleccionado)
  }
  //Metodo para editar el producto
  editarProducto(){
    let nuevoProducto: Producto = {
      nombre: this.nuevoProducto.value.nombre!,
      puntuacion: this.nuevoProducto.value.puntuacion!,
      idProducto: this.productoSeleccionado.idProducto,
      descripcion: this.nuevoProducto.value.descripcion!,
      imagen: this.nuevoProducto.value.imagen!
    }
    if(this.imagen===''){
      this.servicioProductos.editarProducto(this.productoSeleccionado.idProducto, nuevoProducto).then((resp)=>{
        alert('Producto Actualizado con exito')
        this.limpiarFormulario()
      })
      .catch((error)=>{
        alert('No se pudo actualizar el producto \n Error: '+error)
      })
    }else if(this.imagen!=''){
          this.storage.subirImagen(this.nombreImagen, this.imagen)
    .then(
      async res=>{
        this.storage.obtenerUrl(res).then(
          async url=>{
            nuevoProducto.imagen=url
            await this.servicioProductos.editarProducto(this.productoSeleccionado.idProducto, nuevoProducto).then((resp)=>{
            alert('Producto Actualizado con exito')
              this.storage.eliminarImagen(this.productoSeleccionado.imagen)

            this.limpiarFormulario()
    })
      .catch(error => {
        alert('Ocurrio un error\nError: ' + error)
      })
          }
        )
      }
    )
    }

  }
  //Metodo para eliminar productos
  mostrarEliminar(producto:Producto){
    this.eliminarVisible=true
    this.productoSeleccionado=producto
    console.log(this.productoSeleccionado)
  }
  eliminarProducto(){
    this.servicioProductos.eliminarProducto(this.productoSeleccionado.idProducto)
    .then((resp)=>{
      this.storage.eliminarImagen(this.productoSeleccionado.imagen)
      alert("El producto fue eliminado con exito")
    })
    .catch((err)=>{
      alert("No se pudo eliminar el producto\n Error: "+err)
    })
    this.eliminarVisible=false
  }
  //Metodo que ejecuta los metodos de subir o editar productos dependiendo de una varible
  cargarProducto(){
    if(this.textoBoton==='Agregar Producto'){
      this.agregarProducto()
    }else if(this.textoBoton==='Editar Producto'){
      this.editarProducto()
    }
  }


}
