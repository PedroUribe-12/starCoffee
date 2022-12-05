import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Seccion1 } from 'src/app/modelos/seccion1';
import { Seccion3 } from 'src/app/modelos/seccion3';
import { Seccion1Service } from 'src/app/servicios/seccion1.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.scss']
})
export class SeccionesComponent implements OnInit {

 
  @Input() tiuloSeccion:string | undefined
  @Input() esloganSeccion:string | undefined
  @Input() imagenSeccion:string | undefined
  @Output() mostrarModal = new EventEmitter<boolean>();
  @Output() enviarEditarSeccion1 = new EventEmitter<Seccion1>();
  @Output() enviarEditarSeccion3 = new EventEmitter<Seccion3>();
  imagen:string;
  nombreImagen:string
  displayModal: boolean=false;

  //creamos el controlador del formulario
  actualizarSeccion= new FormGroup({
    titulo: new FormControl('', Validators.required)!,
    descripcion: new FormControl('', Validators.required)!,
    
  })
  seccionSeleccionada1!:Seccion1
  seccionSeleccionada3!:Seccion3
  constructor(private servicioSeccion1:Seccion1Service, private storage:StorageService) { }

  

  ngOnInit(): void {
   
  }
  
 
  
  desplegarModaldeSeccion1(){

    if(this.displayModal==false){
      this.mostrarModal.emit(false)
    }else if(this.displayModal==true){
      this.mostrarModal.emit(true)
      this.enviarEditarSeccion1.emit(this.seccionSeleccionada1)
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
