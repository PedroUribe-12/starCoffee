import { Component, Input, OnInit } from '@angular/core';
import { Seccion1Service } from 'src/app/servicios/seccion1.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Seccion1 } from 'src/app/modelos/seccion1';

import { StorageService } from 'src/app/servicios/storage.service';


@Component({
  selector: 'app-seccion1',
  templateUrl: './seccion1.component.html',
  styleUrls: ['./seccion1.component.scss']
})
export class Seccion1Component implements OnInit {



  imagen?: string
  nombreImagen:string
  seccionSeleccionada:Seccion1
  //declaramos la interfas
  secciones1!: Seccion1[];
  displayModal:Boolean= false

  @Input() admin:boolean=false;
  //creamos el controlador del formulario
  actualizarSeccion= new FormGroup({
    titulo: new FormControl('', Validators.required)!,
    descripcion: new FormControl('', Validators.required)!
    
  })
 
 
  constructor(private servicioSeccion1:Seccion1Service, private storage:StorageService) { }

 

  ngOnInit(): void {
    //llamamos el metodo "getSeccion1" del servicio Seccion1Service
    this.servicioSeccion1.getSeccion1().subscribe(colSeciones1=>{
    this.secciones1= colSeciones1})   
  }
  
  

  //creamos un metodo para mostrar los valores y poder cambiarlos
  mostrarEditar(seccionSeleccionada:Seccion1){

    this.seccionSeleccionada = seccionSeleccionada
    this.displayModal= true
    this.actualizarSeccion.setValue({
      titulo: seccionSeleccionada.titulo,
      descripcion: seccionSeleccionada.descripcion,
     
    })
  
  }
  
  //creamos un meto para actualizar los datos cambiados
  actualizar(){
    this.displayModal=false
    let nuevaSeccion:Seccion1= {
      titulo: this.actualizarSeccion.value.titulo!,
      descripcion: this.actualizarSeccion.value.descripcion!,
      imagen: this.seccionSeleccionada.imagen,
      idSeccion1: this.seccionSeleccionada.idSeccion1
      
    }
   if(this.imagen){
    this.storage.deleteImagen(this.seccionSeleccionada.imagen);
    this.storage.subirImagenaSeccion3(this.nombreImagen, this.imagen)
    .then(async resp=>{
      this.storage.obtenerUrlIMagen(resp).then(
        async url => {
          await this.servicioSeccion1.editarSeccion1(nuevaSeccion.idSeccion1, nuevaSeccion, url).then(sec=>{
            alert('Sección Actualizada')
            this.displayModal=false
          })
          .catch(error=>{
            alert('ocurrió un error')
          })
        }
      )
    })
   }else{
    this.servicioSeccion1.editarSeccion1(nuevaSeccion.idSeccion1, nuevaSeccion, ).then(sec=>{
      alert('Sección Actualizada sin imagen')
      this.displayModal=false
    })
    .catch(error=>{
      alert('ocurrió un error\nError: ' + error)
    })

   }
   
  }


  //creamos el metodo "cargarImagen" para poder obtener la url y nombre de la imagen
  cargarImagen(event:any){
    let archivo = event.target.files[0]
    let reader= new FileReader()
    if(archivo!=undefined){
      reader.readAsDataURL(archivo)
      reader.onload= () => {
        let url=reader.result
        if (url!=null){
          this.nombreImagen= archivo.name
          this.imagen = url.toString()
        }
      }
    }
  }

}
