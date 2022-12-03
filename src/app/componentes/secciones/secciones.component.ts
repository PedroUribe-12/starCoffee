import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Seccion1 } from 'src/app/modelos/seccion1';
import { Seccion1Service } from 'src/app/servicios/seccion1.service';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.scss']
})
export class SeccionesComponent implements OnInit {

 
  @Input() tiuloSeccion:string | undefined
  @Input() esloganSeccion:string | undefined
  @Input() imagenSeccion:string | undefined
  
 

  //creamos el controlador del formulario
  actualizarSeccion= new FormGroup({
    titulo: new FormControl('', Validators.required)!,
    descripcion: new FormControl('', Validators.required)!,
    imagen: new FormControl('',Validators.required)!
  })
  seccionSeleccionada!:Seccion1
 
  constructor(private servicioSeccion1:Seccion1Service,) { }

  //declaramos las interfaces
  secciones1!: Seccion1[];

  ngOnInit(): void {
    //llamamos el metodo "getSeccion1" del servicio Seccion1Service
    this.servicioSeccion1.getSeccion1().subscribe(colSeciones1=>{
      this.secciones1= colSeciones1})
  }
  
  displayModal: boolean=false;
  showBasicDialog() {
    this.displayModal = true;
  }

  //creamos un metodo para mostrar los valores y poder cambiarlos
  mostrarEditar( seccionSeleccionada:Seccion1){
    this. seccionSeleccionada= seccionSeleccionada
    this.displayModal = true;
    this.actualizarSeccion.setValue({
      titulo: seccionSeleccionada.titulo,
      descripcion: seccionSeleccionada.descripcion,
      imagen: seccionSeleccionada.imagen
      
    })
    
  }

  //creamos un meto para actualizar los datos cambiados
  actualizar(){

    let nuevaSeccion:Seccion1= {
      titulo: this.actualizarSeccion.value.titulo!,
      descripcion: this.actualizarSeccion.value.descripcion!,
      imagen: this.actualizarSeccion.value.imagen!,
      idSeccion: this.seccionSeleccionada.idSeccion
    
    }

    this.servicioSeccion1.editarSeccion1(this.seccionSeleccionada.idSeccion, nuevaSeccion ).then((resp)=>{
      alert("Seccion actializada con exito")
      this. actualizarSeccion= new FormGroup({
        titulo: new FormControl('', Validators.required)!,
        descripcion: new FormControl('', Validators.required)!,
        imagen: new FormControl('', Validators.required)!
      })
    
    })
    .catch((error)=>{
      alert('No se puede actualizar')
    })


  }

  
}
