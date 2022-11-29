import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.scss']
})
export class SeccionesComponent implements OnInit {

  @Input() tiuloSeccion:string | undefined
  @Input() esloganSeccion:string | undefined
  @Input() imagenSeccion:string | undefined
  constructor() { }

  ngOnInit(): void {
  }

}
