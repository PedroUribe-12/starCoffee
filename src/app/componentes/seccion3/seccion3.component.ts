import { Component, OnInit } from '@angular/core';
import { Seccion3 } from 'src/app/modelos/seccion3';
import { Seccion3Service } from 'src/app/servicios/seccion3.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/servicios/storage.service';
import { async } from 'rxjs';
@Component({
  selector: 'app-seccion3',
  templateUrl: './seccion3.component.html',
  styleUrls: ['./seccion3.component.scss']
})
export class Seccion3Component implements OnInit {


  imagen?:string;

  nombreImagen:string

  //declaramos la interfas
  seciones3: Seccion3[]

  displayModal:Boolean= false

  seccionSeleccionada!:Seccion3

  //creamos el controlador del formulario
  actualizarSeccion= new FormGroup({
    titulo: new FormControl('', Validators.required)!,
    descripcion: new FormControl('', Validators.required)!,
    
  })

  constructor(private servicioSeccion3:Seccion3Service, private storage:StorageService) { }

  ngOnInit(): void {
    
    this.servicioSeccion3.getSeccion3().subscribe(colSeciones3=>{
      this.seciones3= colSeciones3})
  }


  //creamos un metodo para mostrar los valores y poder cambiarlos
  mostrarEditar(seccionSeleccionada:Seccion3){
    
    this.seccionSeleccionada = seccionSeleccionada
    this.displayModal= true
    this.actualizarSeccion.setValue({
      titulo: seccionSeleccionada.titulo,
      descripcion: seccionSeleccionada.descripcion,
    
      
     
    })
  
  }
  
  //creamos un meto para actualizar los datos cambiados
  actualizarSeccion3(){

    let nuevaSeccion:Seccion3= {
      titulo: this.actualizarSeccion.value.titulo!,
      descripcion: this.actualizarSeccion.value.descripcion!,
      imagen: this.seccionSeleccionada.imagen,
      idSeccion3: this.seccionSeleccionada.idSeccion3
      
    }
   if(this.imagen){
    this.storage.deleteImagen(this.seccionSeleccionada.imagen);
    this.storage.subirImagenaSeccion3(this.nombreImagen, this.imagen)
    .then(async resp=>{
      this.storage.obtenerUrlSeccion3(resp).then(
       async url => {
        await this.servicioSeccion3.editarSeccion3(nuevaSeccion.idSeccion3, nuevaSeccion, url).then(secc=>{
          alert('Seccion Actualizada')
          this.displayModal=false
        })
        .catch(error=>{
          alert('ocurrio un error')
        })
       }
      )
    })
   }else{
    this.servicioSeccion3.editarSeccion3(nuevaSeccion.idSeccion3, nuevaSeccion, ).then(secc=>{
      alert('Seccion Actualizada sin imagen')
      this.displayModal= false
    })
    .catch(erro=>{
      alert('ocurrio un error\nError: ' + erro)
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