console.log("Bienvenido a la primer entrega de JS");
var aluSelecc;
var validador = true;
var valorNota;
let listaAlumnos = [];
class alumno {
    constructor(apellido, nombre, notaTotal, cantNotas) {
        this.id = Date.now()
        this.apellido = apellido.toUpperCase();
        this.nombre = nombre.toUpperCase();
        this.notaTotal = 0;
        this.cantNotas = 0;
    }
    listar() {
        console.log(this.apellido + " " + this.nombre)
    }
    sumaNota(nota) {
        this.notaTotal = this.notaTotal + nota;
        this.cantNotas = this.cantNotas + 1;
    }
}

//Arrowfunction
/*
const obtenerDatosJson = ()=> {
    fetch("data/data.json")
        .then((respuesta)=>{
            //console.log(respuesta)
            return respuesta.json()
        } )
        .then((dato) =>{
            mostrarHTML(dato)
        })
        .catch((err)=> {
            console.log("Error", err)
        })
}

mostrarHTML = (empleados) => {
    let html = "";
    empleados.forEach((empleado)=>{
         const {nombre, empresa, puesto} = empleado;

         html += `
         <p>Empleado: ${nombre} </p>
         <p>Empresa: ${empresa} </p>
         <p>Puesto: ${puesto} </p>
         <hr>
          `  
    })
    
    contenido.innerHTML = html;
}
const contenido = document.querySelector('#contenido');*/

//Evento
const desplegaForm = document.querySelector('#desplegaform');

desplegaForm.addEventListener('click', mostraFormAgrega)

const formAgrega = document.querySelector('#formAgrega');
formAgrega.addEventListener('submit', ingresaAlumno);
//formAgrega.addEventListener('submit', obtenerDatosJson)

const listaAlu = document.querySelector('#listaAlumno');
listaAlu.addEventListener('click', listaAlumno);

const contenedorAlumnos = document.querySelector(".contenedor-alumnos");

const listarNotas = document.querySelector('#listaNotas')
listarNotas.addEventListener('click', listaParaNota);

const formNota = document.querySelector('#agregarNota');
formNota.addEventListener('submit', sumando);
formNota.addEventListener('submit', sumando);

//Funciones

function ingresaAlumno(evt) {
    evt.preventDefault()
    const valueApe = document.querySelector('#apellidoAlu').value
    const valueNom = document.querySelector('#nombreAlu').value

    valueNom != '' && valueApe != '' ? listaAlumnos.push(new alumno(document.getElementById("apellidoAlu").value, document.getElementById("nombreAlu").value, 0, 0)) : mensajeError();
    valueNom != '' && valueApe != '' ? Swal.fire('Alumno Agregado!!') : false;
    listaAlumnos.sort((x, y) => {
        if (x.nombre > y.nombre) {
            return 1;
        }
        if (x.nombre < y.nombre) {
            return -1;
        }
        return 0;
    });
    listaAlumnos.sort((x, y) => {
        if (x.apellido > y.apellido) {
            return 1;
        }
        if (x.apellido < y.apellido) {
            return -1;
        }
        return 0;
    });
    // console.log(listaAlumnos)
    formAgrega.reset()
    localStorage.setItem('listaAlumnos', JSON.stringify(listaAlumnos))
    ocultaFormAgrega()
}

function listaAlumno() {
    ocultaFormNota()
    limpiaLista();
    listaAlumnos = JSON.parse(localStorage.getItem('listaAlumnos')) || [];

    for (const alumno of listaAlumnos) {
        const divAlumno = document.createElement('div');
        divAlumno.classList.add('contenedor-alumnos');

        const titApellidoNombre = document.createElement('h4');
        titApellidoNombre.textContent = (alumno.apellido + " " + alumno.nombre);

        const notaAlumno = document.createElement('h5');
        notaAlumno.textContent = ("Suma de sus notas: " + alumno.notaTotal);

        const btnBorrar = document.createElement('button');
        btnBorrar.classList = "borrarAlumno";
        btnBorrar.innerText = "Eliminar"

        divAlumno.appendChild(titApellidoNombre)
        divAlumno.appendChild(notaAlumno)
        divAlumno.appendChild(btnBorrar)
        divAlumno.dataset.alumnoID = alumno.id;
        contenedorAlumnos.appendChild(divAlumno)
    }

    const eliminaAlumno = document.getElementsByClassName('borrarAlumno');

    for (const alum of eliminaAlumno) {
        alum.addEventListener('click', borraAlumno);
    }
}

function listaParaNota() {
    ocultaFormNota()
    limpiaLista();
    listaAlumnos = JSON.parse(localStorage.getItem('listaAlumnos')) || [];

    for (const alumno of listaAlumnos) {
        const divNota = document.createElement('div');
        divNota.classList.add('contenedor-alumnos');

        const titApellidoNombre = document.createElement('h4');
        titApellidoNombre.textContent = (alumno.apellido + " " + alumno.nombre);

        const btnSelecciona = document.createElement('button');
        btnSelecciona.className = "seleccionAlumno";
        btnSelecciona.innerText = "Seleccionar"

        const notaAlumno = document.createElement('h5');
        notaAlumno.textContent = ("Suma de sus notas: " + alumno.notaTotal);

        divNota.appendChild(titApellidoNombre)
        divNota.appendChild(notaAlumno)
        divNota.appendChild(btnSelecciona)
        divNota.dataset.alumnoID = alumno.id;
        contenedorAlumnos.appendChild(divNota)
    }
    const agregarNota = document.getElementsByClassName('seleccionAlumno');


    for (const alum of agregarNota) {
        alum.addEventListener('click', identificaAlu);
        //alum.addEventListener('click', mostraFormNota);
    }
}

function identificaAlu(evt2) {
    evt2.preventDefault()
    aluSelecc = evt2.target.parentElement.dataset.alumnoID
    mostraFormNota()
    return aluSelecc;
}

function sumando(evt3, identificaAlu) {
    evt3.preventDefault()

    validaNota()

    if (validador) {
        const idAlum = listaAlumnos.map(item => {

            return {
                id: `${item.id}`
            }

        });

        const o = idAlum.find(elemento => {
            return elemento.id === aluSelecc;
        });

        const n = idAlum.indexOf(o);

        var sel = listaAlumnos[n];

        console.log(n)
        valorNota = parseFloat(valorNota)
        var Total = parseFloat(sel.notaTotal)
        Total = Total + valorNota;
        sel.notaTotal = Total;
        console.log (Total)
    }
}

function validaNota() {
    valorNota = document.querySelector('#notaAlu').value
    validador = true;
    if (valorNota > 10) {
        const padre = document.querySelector("#errorMensaje")
        const mensajeError = document.createElement('p')
        mensajeError.textContent = "ERROR, La escala es de 1 a 10";
        mensajeError.classList.add('cuadroError')

        padre.appendChild(mensajeError)

        setTimeout(() => {
            mensajeError.remove()
        }, 2000)
        validador = false;
    } else if (valorNota < 1) {
        const padre = document.querySelector("#errorMensaje")
        const mensajeError = document.createElement('p')
        mensajeError.textContent = "ERROR, La escala es de 1 a 10";
        mensajeError.classList.add('cuadroError')

        padre.appendChild(mensajeError)

        setTimeout(() => {
            mensajeError.remove()
        }, 2000)
        validador = false;
    }
    return validador;
}

function mostraFormAgrega() {
    limpiaLista()
    ocultaFormNota()
    document.getElementsByClassName("desplega-form")[0].style.display = "block";

}

function ocultaFormAgrega() {
    document.getElementsByClassName("desplega-form")[0].style.display = "none";

}

function mostraFormNota() {
    document.getElementsByClassName("form-nota")[0].style.display = "block";

}

function ocultaFormNota() {
    document.getElementsByClassName("form-nota")[0].style.display = "none";

}

function borraAlumno(evt1) {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Seguro que desea Eliminarlo?',
        text: "Perderá las notas y progreso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar!',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            const idB = evt1.target.parentElement.dataset.alumnoID
            listaAlumnos = listaAlumnos.filter(alumno => alumno.id != idB)
            localStorage.clear()
            localStorage.setItem('listaAlumnos', JSON.stringify(listaAlumnos))

            limpiaLista();
            swalWithBootstrapButtons.fire(
                'El Alumno Fue Eliminado!',
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            limpiaLista();

            swalWithBootstrapButtons.fire(
                'Acción Cancelada',
            )
        }
    })
}

function mensajeError() {
    const padre = document.querySelector("#errorMensaje");


    const mensajeError = document.createElement('p')
    mensajeError.textContent = "ERROR, ingrese Nombre y Apellido";
    mensajeError.classList.add('cuadroError')

    padre.appendChild(mensajeError)

    setTimeout(() => {
        mensajeError.remove()
    }, 2000)

}

function limpiaLista() {
    // console.log(contenedorAlumnos.firstChild)
    while (contenedorAlumnos.firstChild) {
        contenedorAlumnos.removeChild(contenedorAlumnos.firstChild)
    }

}