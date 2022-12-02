import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Seccion1 } from 'src/app/modelos/seccion1';
import { Seccion3 } from 'src/app/modelos/seccion3';
import { Seccion1Service } from 'src/app/servicios/seccion1.service';
import { Seccion3Service } from 'src/app/servicios/seccion3.service';

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
    descripcion: new FormControl('', Validators.required)!
  })
 
  seccionSeleccionada!: Seccion1 | Seccion3;
  constructor(private servicioSeccion1:Seccion1Service, private servicioSeccion3:Seccion3Service) { }

  ngOnInit(): void {
  }
  
  displayModal: boolean=false;
  showBasicDialog() {
    this.displayModal = true;
  }

//creamos un metodo para mostrar los valores y poder cambiarlos
  mostrarEditar( seccionSeleccionada:Seccion1 | Seccion3){
    this. seccionSeleccionada= seccionSeleccionada
    this.displayModal = true;
    this.actualizarSeccion.setValue({
      titulo: seccionSeleccionada.titulo,
      descripcion: seccionSeleccionada.descripcion
    })
    
  }

  //creamos un meto para actualizar los datos cambiados
  actualizar(){

    let nuevaSeccion:Seccion1 | Seccion3 = {
      titulo: this.actualizarSeccion.value.titulo!,
      descripcion: this.actualizarSeccion.value.descripcion!,
      idSeccion: this.seccionSeleccionada.idSeccion
    
    }

    this.servicioSeccion1.editarSeccion1(this.seccionSeleccionada.idSeccion, nuevaSeccion ).then((resp)=>{
      alert("Seccion actializada con exito")
      this. actualizarSeccion= new FormGroup({
        titulo: new FormControl('', Validators.required)!,
        descripcion: new FormControl('', Validators.required)!
      })
    
    })
    .catch((error)=>{
      alert('No se puede actualizar')
    })

    this.servicioSeccion3.editarSeccion3(this.seccionSeleccionada.idSeccion, nuevaSeccion ).then((resp)=>{
      alert("Seccion actializada con exito")
      this. actualizarSeccion= new FormGroup({
        titulo: new FormControl('', Validators.required)!,
        descripcion: new FormControl('', Validators.required)!
      })
    
    })
    .catch((error)=>{
      alert('No se puede actualizar')
    })
  }


}
