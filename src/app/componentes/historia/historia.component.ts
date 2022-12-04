import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Historia } from 'src/app/modelos/historia';
import { HistoriaService } from 'src/app/servicios/historia.service';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.scss']
})
export class HistoriaComponent implements OnInit {

  //declaramos la variable imagen
  imagen!:string
  //declaramos la variable Nnombre Imagen
  nombreImagen!:string

  //declaramos la variable bollean para abrir y cerrar el modal
  displayModal: boolean=false

  //creamos el conrolador del formulario
  actualizarHistoria= new FormGroup({
    descripcion: new FormControl('', Validators.required)!
  })


  //seleccionamos la interfaces
  historiaSeleccionada!:Historia;

  constructor(private servicioHistoria:HistoriaService) { }

  //declaamos las interfaces
  historia!:Historia[]

  ngOnInit(): void {
    //llamamos al metodo "obtenerHistoria" para obtener los datos en el componente
    this.servicioHistoria.obtenerHistoria().subscribe(colHistoria=>{
      this.historia = colHistoria
    })
  }

  //creamos un metodo para mostrar los valores y poder cambiarlos
  mostrarEditar(historiaSeleccionada:Historia){
    this.historiaSeleccionada = historiaSeleccionada
    this.displayModal= true
    this.actualizarHistoria.setValue({
      descripcion: historiaSeleccionada.descripcion
    })
  }

  //creaamos un metodo para actualizar los datos y agregarlos

  actualizar(){
    let nuevaHistoria:Historia= {
      descripcion: this.actualizarHistoria.value.descripcion!,
      idHistoria: this.historiaSeleccionada.idHistoria!,
      imagenHistoria: ""
    }

    this.servicioHistoria.editarHistoria(this.historiaSeleccionada.idHistoria, nuevaHistoria).then((resp)=>{
      alert("Historia actualizada")
      this.actualizarHistoria= new FormGroup({
        descripcion: new FormControl('', Validators.required)!
      })
    })
    .catch((error)=>{
      alert("NO sae pude Actualizar")
    })
  }



}
