import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  //datos que le van a dar a un componente que esta usando input
    titulo1:string="Comidas"
    eslogan1:string="Disfruto las mañanas con cafe"
    imagen1:string='../../../assets/imagenes/medialunas.jpg'
  //datos que le van a dar a un componente que esta usando input
    titulo2:string="Cafes"
    eslogan2:string="La mejor preparacion de cafes estan aca" //LAMEJOR PREPARACIÓN DE CAFES LA ENCONTRAS ACA
    imagen2:string='../../../assets/imagenes/maquinas-para-cafeteria.png'
  constructor() { }

  ngOnInit(): void {
  }

}
