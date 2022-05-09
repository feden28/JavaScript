console.log("Bienvenido a la primer entrega de JS");
let fin = false;
let nota = 0;
let numAlu = "";
let menuPpal = false;
let cambiaAlu = true;
const listaAlumnos = [];
const contenedorAlumnos = document.querySelector(".contenedor-alumnos");
class alumno {
    constructor(apellido,nombre , notaTotal, cantNotas){
        this.apellido = apellido.toUpperCase();
        this.nombre = nombre.toUpperCase();
        this.notaTotal = 0;
        this.cantNotas = 0;
    }
    listar(){
        console.log (this.apellido + " " + this.nombre)
    }
    sumaNota(){
        this.notaTotal = this.notaTotal + nota;
        this.cantNotas = this.cantNotas + 1;
    }
}


function alumnos() {
            console.log("I - Ingresar nuevo Alumno")
            console.log("L - Listar Alumnos")
            console.log("B - Borrar Alumno")
            console.log("ESC - Menú Anterior")
            
            let opc1 = prompt("ingrese su opción");
            opc1 = opc1.toUpperCase();

            switch (opc1){
                case "I":
                    listaAlumnos.push(new alumno (prompt("Ingrese el Apellido del Alumno"), prompt("Ingrese el Nombre del Alumno") , 0));
                    listaAlumnos.sort((x,y) => {
                        if (x.nombre > y.nombre) {
                            return 1;
                        }
                        if (x.nombre <y.nombre) {
                            return -1;
                        }
                        return 0;
                    });
                    listaAlumnos.sort((x,y) => {
                        if (x.apellido > y.apellido) {
                            return 1;
                        }
                        if (x.apellido <y.apellido) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                case "L":
                    for (const alumno of listaAlumnos) {
                        const divAlumno = document.createElement('div');
                        divAlumno.classList.add('contenedor-alumnos');  
                        
                        const titApellidoNombre = document.createElement('h3');
                        titApellidoNombre.textContent = (alumno.apellido + " " + alumno.nombre);

                        const notaAlumno = document.createElement('h5');
                        notaAlumno.textContent = ("Suma de sus notas: " + alumno.notaTotal);

                        divAlumno.appendChild(titApellidoNombre)
                        divAlumno.appendChild(notaAlumno)
                        contenedorAlumnos.appendChild(divAlumno)
                    }
                
                    break;
                case "B":
                    for(let i = 0; i<listaAlumnos.length; i++) {
                        console.log(i+1 + " - ")
                        listaAlumnos[i].listar();
                    }
                    let elim = Number(prompt("Indique el número del Alúmno que desea Borrar"))
                    listaAlumnos.splice(elim-1 , 1);
                    break;
                case "ESC":
                    menuPpal = true;
                    break;
                default:
                    break;
            }
}

function opciones() {
    while (cambiaAlu != false) {
        seleccionaAlumno();
    }
    console.log("Para: ")
    //listaAlumnos[numAlu].listar();
    console.log("Seleccione que desea hacer:")
    console.log("N - Cargar Nota")
    //console.log("E - Borrar Nota")
    console.log("C - Calcular Promedio")
    console.log("S - Situación Alumno")
    console.log("O - Cambiar Alumno")
    console.log("ESC - Salir al Menú Anterior")

    let opc = prompt("ingrese su opción");
    opc = opc.toUpperCase();
    console.log("Su opción es: " + opc);
  
    switch (opc) {
        case "N":
            cargaNota();
            break;
        case "E":
            borraNota();
            break;
        case "C":
            calculaPromedio();
            break;
        case "A":
            analizaAlumno();
            break;
        case "O":
            cambiaAlu = true;
            break;
        case "ESC":
            menuPpal = true;
            break;
        default:
            break;

    }

}

function seleccionaAlumno() {
    for(let i = 0; i<listaAlumnos.length; i++) {
        console.log(i+1 + " - ")
        listaAlumnos[i].listar();
    }
    cambiaAlu = false
    numAlu = prompt("A qué alumno le cargará notas, ingrese el número según lista.");
    numAlu = numAlu-1;
    return numAlu;
} 

function cargaNota() {
    do {
        nota = prompt("Ingrese la Nota")
        nota = parseFloat(nota);
        if (nota >10){
            alert ("La nota no puede ser mayor a 10! Reingrese")
        }
    } while (nota > 10);
   
    if (isNaN(nota)) {
        alert("El valor ingresado no es un número")
    } else if (nota < 0) {
        alert("La nota no puede ser negativa")
    } else {
        alert("Nota Sumada al total!!");
        console.log(listaAlumnos[numAlu].sumaNota())
        console.log(listaAlumnos[numAlu])
    }
}
/*
function borraNota() {
    let nota = prompt("Ingrese la Nota a BORRAR")
    nota = parseFloat(nota);
    console.log (sumaNota);
    if (isNaN(nota)) {
        alert("El valor ingresado no es un número")
    } else if (nota < 0) {
        alert("La nota no puede ser negativa")
    } else if (sumaNota <= 0) {

        alert("La suma de Notas es Cero, no puede eliminar")

    } else if (sumaNota - nota < 0) {
        alert("No puede Eliminar más nota de la que el alumno tiene.")
    } else {
        alert("Nota Borrada del total!!");
        sumaNota = sumaNota - nota;
        i = i-1;
        console.log ("Suma de Notas Parcial " + sumaNota)
    }
}
*/

function calculaPromedio() {
    
    console.log ("La Nota Promedio del Alumno " + nomAlumno + " es:" + sumaNota/i)

}

function analizaAlumno() {
    alert ("Opción no disponible temporalmente.")
}

while (fin != true) {
    
        console.log("Seleccione que desea hacer:")
        console.log("A - Menú Alumnos")
        console.log("B - Menú Notas")
        console.log("ESC - Salir")
        let opc2 = prompt();
        opc2 = opc2.toUpperCase();
        switch (opc2){
            case "A":
                while(menuPpal != true){
                    alumnos();
                }
                menuPpal = false;
                break;
            case "B":
                while(menuPpal != true){
                    opciones();
                }
                menuPpal = false;
                break;
            case "ESC":
                fin = true;
                break;
            default:
                break;
        }
    
    console.log (fin);
    if (fin!=true){
        
    } else if (confirm("Desea terminar?")){
        alert("Hasta Pronto")
    } else {
        fin = false;
    }

}

