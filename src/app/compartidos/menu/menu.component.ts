import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //A continuación vamos a declarar las variables para que el boton haburguesa funcione

    //Le declaramos a "btnmenu" la clase ".nav_toggle"
    const btnmenu = document.querySelector(".nav_toggle")

    //Le declaramos a "menu" la clase ".nav_menu"
    const menu = document.querySelector(".nav_menu")

    //Le declaramos a "menu2" la clase ".nav_administracion"
    const menu2= document.querySelector(".nav_administracion")

    const linkMenu= document.getElementById("link1"), linkMenu2= document.getElementById("link2"),linkMenu3= document.getElementById("link3")  
    const linkMenu4 = document.getElementById("link4"), linkMenu5 = document.getElementById("link5")
    const links=[linkMenu,linkMenu2,linkMenu3,linkMenu4]
    links.forEach(link => link?.addEventListener("click",function(){
      menu?.classList.toggle("nav_menu_visible")
      menu2?.classList.toggle("nav_menu_visible")
    }))
    //a "btnmenu" le asignamos un evento "click" que va a accionar una funcion
    //esta funcion va a hacer visble la lista de los items
    //Esta accion solo va a poder ser realizada cuando la pagina se encuentre en formato de dispositivo movil
    btnmenu?.addEventListener("click", function(){
      menu?.classList.toggle("nav_menu_visible")
      menu2?.classList.toggle("nav_menu_visible")
    })
    //método scroll
    //al hacer un scroll abrirá un evento, que llamar a un metodo
    window.addEventListener("scroll", function(){
      //este metodo nos va a declarar la variable "header" con la clase "header" 
      var header = document.querySelector("header")

      //La funcion declarara que se agregue una clase llamada "abajo"
      //que cambiara el el color de fondo del nav
      header?.classList.toggle("abajo", window.scrollY>50)
    })
  }

}
