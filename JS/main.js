console.log ("Bienvenido a la primer entrega de JS");

let nombrePersona = prompt("Ingrese su Nombre");
let apellidoPersona = prompt("Ingrese su Apellido");
const bco = " ";
let entero = true;
let num;

do {

num = prompt ("Ingrese un número entero")

if (num % 1 ==0){
    entero = false;
} else {
    alert ("El número no es entero, reingrese");
}

}while (entero);

let mensaje = "Hola! " + nombrePersona + bco + apellidoPersona;
let i = 0;

while (i < num) {

    console.log(mensaje);
    i = i + 1;
}
let opc = 0;

while (opc != "esc") {
    console.log("Qué acción deseas realizar " + nombrePersona + " ?");
    console.log("Sumar Números - Ingrese 'S'");
    console.log("Formar Oración - Ingrese 'O'");
    console.log("Salir - Ingrese 'ESC'");
    opc = prompt("Ingrese una opción");
    opc = opc.toLowerCase();
    console.log("Su opción es " + opc)
    let numSuma = 1;
    let Suma = 0;
    let i = 0;
    
    switch (opc) {
        case "s":
            while (numSuma != 0) {
                numSuma = prompt("Ingrese un número a Sumar, para terminar, ingrese 0");
                numSuma = parseFloat(numSuma);
                if (isNaN(numSuma)){
                    alert ("El valor ingresado no es un número.")
                }else {
                    Suma = Suma + numSuma;
                    if (numSuma != 0) {
                        i = i + 1;
                    }
                }
            }
            console.log("Se Sumaron " + i + " números.");
            console.log("La Suma Total dió: " + Suma);
            break;

        case "o":
            Suma = "";
            while (numSuma != "ESC") {
                numSuma = prompt("Ingrese un palabra para su Oración, para terminar, ingrese ESC");
                numSuma = numSuma.toUpperCase();
                if (numSuma != "ESC"){

                    if (isNaN(numSuma)){
                        Suma = Suma + bco + numSuma;
                        i = i + 1;
                        //console.log(Suma);
                    }else {
                        let validaNum = confirm ("El valor ingresado es un número. Desea Incluirlo?");
                        if (validaNum){
                            Suma = Suma + bco + numSuma;
                            i = i + 1;
                            //console.log(Suma);
                        }
                    }
                }
            }
            console.log("Se Sumaron " + i + " palabras.");
            console.log("La Oración es: " + Suma + ".");
            break;

        default:
            break;
    }
  
console.log("Gracias por utilizar nuestro programa! Hasta Pronto!!");
alert("Gracias por utilizar nuestro programa! Hasta Pronto!!");
}