console.log("Bienvenido a la primer entrega de JS");
let nomAlumno = "";

function nombreAlumno() {
    nomAlumno = prompt("Ingrese el nombre completo del alumno");
    sumaNota = 0;
    menuAnt = false;
    i =0;
}


let fin = false;
let sumaNota = 0;        
let menuAnt = false;
let i =0;

function opciones() {

    console.log("Seleccione que desea hacer:")
    console.log("N - Cargar Nota")
    console.log("E - Borrar Nota")
    console.log("C - Calcular Promedio")
    console.log("A - Analizar Situación Alumno")
    console.log("S - Salir al Menú Anterior")

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
        case "S":
            salirMenu()
            break;
        default:
            break;

    }

}

function cargaNota() {
    let nota = prompt("Ingrese la Nota")
    nota = parseFloat(nota);

    if (isNaN(nota)) {
        alert("El valor ingresado no es un número")
    } else if (nota < 0) {
        alert("La nota no puede ser negativa")
    } else {
        alert("Nota Sumada al total!!");
       sumaNota = sumaNota + nota;
       i = i+1;
        console.log ("Suma de Notas Parcial " + sumaNota)
    }
}

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

function calculaPromedio() {
    
    console.log ("La Nota Promedio del Alumno " + nomAlumno + " es:" + sumaNota/i)

}

function analizaAlumno() {
    alert ("Opción no disponible temporalmente.")
}

function salirMenu() {
    menuAnt = true
}

while (fin != true) {
    if (confirm("Desea evaluar un alumno")) {
        nombreAlumno();

        while (menuAnt != true) {
            opciones();
        }

    } else if (confirm("Desea terminar?")) {
        fin = true;
    }


}