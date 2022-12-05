import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Historia } from 'src/app/modelos/historia';
import { HistoriaService } from 'src/app/servicios/historia.service';
import { StorageHistoriaService } from 'src/app/servicios/storage-historia.service';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.scss']
})
export class HistoriaComponent implements OnInit {

  //declaramos la variable imagen
  imagen?:string
  //declaramos la variable Nnombre Imagen
  nombreImagen!:string

  //declaramos la variable bollean para abrir y cerrar el modal
  displayModal: boolean=false

   //seleccionamos la interfaces
   historiaSeleccionada!:Historia;

  //creamos el conrolador del formulario
  actualizarHistoria= new FormGroup({
    descripcion: new FormControl('', Validators.required)!
  })


  

  constructor(private servicioHistoria:HistoriaService, private historiaStorage:StorageHistoriaService) { }

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
      imagenHistoria: this.historiaSeleccionada.imagenHistoria
    }

    if(this.imagen){
      this.historiaStorage.deleteImagen(this.historiaSeleccionada.imagenHistoria);
      this.historiaStorage.subirImagen(this.nombreImagen, this.imagen)
      .then(async resp=>{
        this.historiaStorage.obtenerUrlIMagen(resp).then(
          async url => {
            await this.servicioHistoria.editarHistoria(nuevaHistoria.idHistoria, nuevaHistoria, url).then(sec=>{
              alert('Seecion Actualizada')
              this.displayModal=false
            })
            .catch(error=>{
              alert('ocurrio un error')
            })
          }
        )
      })
     }else{
      this.servicioHistoria.editarHistoria(nuevaHistoria.idHistoria, nuevaHistoria, ).then(sec=>{
        alert('Seecion Actualizada sin imagen')
        this.displayModal=false
      })
      .catch(error=>{
        alert('ocurrio un error\nError: ' + error)
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
