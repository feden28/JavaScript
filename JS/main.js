console.log("Bienvenido a la primer entrega de JS");
var aluSelecc;
var sumNota = false
var borrNota = false
var validador = true
var valAprobados = false
var valDesaprobados = false
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
}

//Fetch

const obtenerDatosJson = () => {
    fetch("data/data.json")
        .then((respuesta) => {
            //console.log(respuesta)
            return respuesta.json()
        })
        .then((dato) => {
            mostrarHTML(dato)
        })
        .catch((err) => {
            console.log("Error", err)
        })
}

mostrarHTML = (docentes) => {
    let html = "";
    docentes.forEach((docente) => {
        const {
            nombre,
            apellido,
            funcion
        } = docente;

        html += `
         <hr>
         <p>Nombre: ${nombre} </p>
         <p>Apellido: ${apellido} </p>
         <p>Funcion: ${funcion} </p>
          `
    })

    contenido.innerHTML = html + `<hr>`;
}



//Evento

const iniciar = document.querySelector('.botonEntrada');
iniciar.addEventListener('click', vista => {
    document.getElementsByClassName("botonEntrada")[0].style.display = "none";
    document.getElementsByClassName("menuPpal")[0].style.display = "block";
})

const contenido = document.querySelector('.contenedor-docentes');

const desplegaForm = document.querySelector('#desplegaform');

desplegaForm.addEventListener('click', mostraFormAgrega)

const formAgrega = document.querySelector('#formAgrega');
formAgrega.addEventListener('submit', ingresaAlumno);

const listaDocentes = document.querySelector('#listaDocentes');
listaDocentes.addEventListener('click', obtenerDatosJson)

const listaAlu = document.querySelector('#listaAlumno');
listaAlu.addEventListener('click', listaAlumno);

const contenedorAlumnos = document.querySelector(".contenedor-alumnos");

const listarNotas = document.querySelector('#listaNotas');
listarNotas.addEventListener('click', listaParaNota);

const formNota = document.querySelector('#agregarNota');
formNota.addEventListener('submit', sumando);

const borrandoNota = document.querySelector('#borraNota');
borrandoNota.addEventListener('submit', sumando);

const listaAprobados = document.querySelector('#aprobados');
listaAprobados.addEventListener('click', validaProm => {
    valAprobados = true;
})

const listaDesaprobados = document.querySelector('#desaprob');
listaDesaprobados.addEventListener('click', validaProm => {
    valDesaprobados = true;
})

const listaPromedios = document.querySelectorAll('.listaPromedio');
for (const lista of listaPromedios) {
    lista.addEventListener('click', promedio);
}

const cerrarPrograma = document.querySelector('.botonSalida');
cerrarPrograma.addEventListener('click', cerrarProg => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Seguro que desea Salir?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear()
            location.reload();

            document.getElementsByClassName("menuPpal")[0].style.display = "none";
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
   
})

//Funciones

function promedio() {
    ocultaFormAgrega()
    ocultaFormNota()
    ocultaBorraNota()
    limpiaLista()
    var listaProm = [];
    listaAlumnos = JSON.parse(localStorage.getItem('listaAlumnos')) || [];

    if (valDesaprobados) {
        listaProm = listaAlumnos.filter(alumno => alumno.notaTotal / alumno.cantNotas < 6)

    } else if (valAprobados) {
        listaProm = listaAlumnos.filter(alumno => alumno.notaTotal / alumno.cantNotas >= 6)

    }

    for (const alumno of listaProm) {

        const divAlumno = document.createElement('div');
        divAlumno.classList.add('contenedor-alumnos');

        const titApellidoNombre = document.createElement('h4');
        titApellidoNombre.textContent = (alumno.apellido + " " + alumno.nombre);

        const notaAlumno = document.createElement('h5');
        alumno.notaTotal = parseFloat(alumno.notaTotal)
        var promedio = (alumno.notaTotal / alumno.cantNotas)
        promedio = parseFloat(promedio)
        notaAlumno.textContent = ("Promedio Actual: " + promedio);

        divAlumno.appendChild(titApellidoNombre)
        divAlumno.appendChild(notaAlumno)
        contenedorAlumnos.appendChild(divAlumno)
    }


    valAprobados = false
    valDesaprobados = false
}

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

    formAgrega.reset()
    localStorage.setItem('listaAlumnos', JSON.stringify(listaAlumnos))
    ocultaFormAgrega()
}

function listaAlumno() {
    ocultaBorraNota()
    ocultaFormNota()
    limpiaLista();
    listaAlumnos = JSON.parse(localStorage.getItem('listaAlumnos')) || [];

    for (const alumno of listaAlumnos) {
        const divAlumno = document.createElement('div');
        divAlumno.classList.add('contenedor-alumnos');

        const titApellidoNombre = document.createElement('h4');
        titApellidoNombre.textContent = (alumno.apellido + " " + alumno.nombre);

        const notaAlumno = document.createElement('h5');
        alumno.notaTotal = parseFloat(alumno.notaTotal)
        var promedio = (alumno.notaTotal / alumno.cantNotas)
        promedio = parseFloat(promedio)
        notaAlumno.textContent = ("Promedio Actual: " + promedio);

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
    ocultaBorraNota()
    ocultaFormNota()
    limpiaLista();
    listaAlumnos = JSON.parse(localStorage.getItem('listaAlumnos')) || [];

    for (const alumno of listaAlumnos) {
        const divNota = document.createElement('div');
        divNota.classList.add('contenedor-alumnos');


        const titApellidoNombre = document.createElement('h4');
        titApellidoNombre.textContent = (alumno.apellido + " " + alumno.nombre);

        const btnAgrega = document.createElement('button');
        btnAgrega.className = "seleccionAlumno";
        btnAgrega.innerText = "Agrega Nota"

        const btnBorra = document.createElement('button');
        btnBorra.className = "borraNotaAlumno";
        btnBorra.innerText = "Borrar Nota"

        const notaAlumno = document.createElement('h5');
        alumno.notaTotal = parseFloat(alumno.notaTotal)
        var promedio = (alumno.notaTotal / alumno.cantNotas)
        promedio = parseFloat(promedio)
        notaAlumno.textContent = ("Promedio Actual: " + promedio);

        divNota.appendChild(titApellidoNombre)
        divNota.appendChild(notaAlumno)
        divNota.appendChild(btnAgrega)
        divNota.appendChild(btnBorra)
        divNota.dataset.alumnoID = alumno.id;
        contenedorAlumnos.appendChild(divNota)
    }
    const agregarNota = document.getElementsByClassName('seleccionAlumno');

    for (const alum of agregarNota) {
        alum.addEventListener('click', idAgregaNotaAlu);
    }

    const borraNota = document.getElementsByClassName('borraNotaAlumno');


    for (const alum of borraNota) {
        alum.addEventListener('click', idBorraNotaAlu);
    }
}

function idAgregaNotaAlu(evt2) {
    evt2.preventDefault()
    sumNota = true;
    aluSelecc = evt2.target.parentElement.dataset.alumnoID
    ocultaBorraNota()
    mostraFormNota()

    return aluSelecc;
}

function idBorraNotaAlu(evt4) {
    evt4.preventDefault()
    borrNota = true;
    aluSelecc = evt4.target.parentElement.dataset.alumnoID
    ocultaFormNota()
    mostraBorraNota()
    return aluSelecc;
}

function sumando(evt3, lanota) {
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
        var Total = parseFloat(sel.notaTotal)
        var Cantidad = parseInt(sel.cantNotas)
        valorNota = parseFloat(valorNota)

        if (sumNota) {

            Total = Total + valorNota;
            Cantidad = Cantidad + 1

            if (Total / Cantidad > 10) {
                const padre = document.querySelector("#errorMensaje")
                const mensajeError = document.createElement('p')
                mensajeError.textContent = "ERROR, El Promedio Supera la Nota Máxima 10";
                mensajeError.classList.add('cuadroError')

                padre.appendChild(mensajeError)

                setTimeout(() => {
                    mensajeError.remove()
                }, 2000)

            } else if (Total / Cantidad < 1) {
                const padre = document.querySelector("#errorMensaje")
                const mensajeError = document.createElement('p')
                mensajeError.textContent = "ERROR, El Promedio es Menor a la Nota Mínima 1";
                mensajeError.classList.add('cuadroError')

                padre.appendChild(mensajeError)

                setTimeout(() => {
                    mensajeError.remove()
                }, 2000)

            } else {
                sel.notaTotal = Total;
                sel.cantNotas = Cantidad;

            }


        } else if (borrNota) {

            Total = Total - valorNota;
            Cantidad = Cantidad - 1

            if (Total / Cantidad > 10) {
                const padre = document.querySelector("#errorMensaje")
                const mensajeError = document.createElement('p')
                mensajeError.textContent = "ERROR, El Promedio Supera la Nota Máxima 10";
                mensajeError.classList.add('cuadroError')

                padre.appendChild(mensajeError)

                setTimeout(() => {
                    mensajeError.remove()
                }, 2000)

            } else if (Total / Cantidad < 1) {
                const padre = document.querySelector("#errorMensaje")
                const mensajeError = document.createElement('p')
                mensajeError.textContent = "ERROR, El Promedio es Menor a la Nota Mínima 1";
                mensajeError.classList.add('cuadroError')

                padre.appendChild(mensajeError)

                setTimeout(() => {
                    mensajeError.remove()
                }, 2000)

            } else {
                sel.notaTotal = Total;
                sel.cantNotas = Cantidad;

            }
        }
    }

    console.log(listaAlumnos);

    localStorage.setItem('listaAlumnos', JSON.stringify(listaAlumnos))

    ocultaFormNota()
    ocultaBorraNota()
    limpiaLista()
    listaParaNota()

    sumNota = false;
    borrNota = false;
}

function validaNota() {
    if (sumNota) {
        valorNota = document.querySelector('#notaAlu').value
    } else if (borrNota) {
        valorNota = document.querySelector('#borranotaAlu').value
    }

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
    ocultaBorraNota()
    ocultaFormNota()
    document.getElementsByClassName("desplega-form")[0].style.display = "block";

}

function ocultaFormAgrega() {
    document.getElementsByClassName("desplega-form")[0].style.display = "none";

}

function mostraFormNota() {
    ocultaFormAgrega()
    ocultaBorraNota()
    document.getElementsByClassName("form-nota")[0].style.display = "block";

}

function ocultaFormNota() {
    document.getElementsByClassName("form-nota")[0].style.display = "none";

}

function mostraBorraNota() {
    ocultaFormAgrega()
    ocultaFormNota()
    document.getElementsByClassName("form-borranota")[0].style.display = "block";

}

function ocultaBorraNota() {
    document.getElementsByClassName("form-borranota")[0].style.display = "none";

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

