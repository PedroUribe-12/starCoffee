import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-de-pagina',
  templateUrl: './pie-de-pagina.component.html',
  styleUrls: ['./pie-de-pagina.component.scss']
})
export class PieDePaginaComponent implements OnInit {
  //Declaracion de variables
  items:any[];
  copyright:string=''
  //Fin de declaracion de variables
  constructor() {
    //Inicializacion de las variables
    this.copyright='© 2022 Star Coffee. Todos los derechos reservados'
    this.items=[{
      titulo:'Inicio'
    },
    {
      titulo:'Contacto'
    },
    {
      titulo:'Pricing'
    },
    {
      titulo:'FAQs'
    },
    {
      titulo:'About'
    }

  ]
   }
  ngOnInit(): void {
  }

}
