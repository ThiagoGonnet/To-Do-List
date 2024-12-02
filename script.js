document.addEventListener("DOMContentLoaded", function() {
    let usuarioinput = document.querySelector("#input_user");
    let btn_agregar = document.querySelector("#btn-agregar");
    let btn_reset = document.querySelector("#btn-reset");
    let contenedor_tareas = document.querySelector("#contenedor-tareas");

    if (!btn_agregar || !btn_reset || !contenedor_tareas) {
        console.error("Uno o más elementos necesarios no se encontraron en el DOM.");
        return;
    }

    // Estilizar el botón "Agregar"
    btn_agregar.style.padding = "0.5rem 1rem";
    btn_agregar.style.backgroundColor = "#28a745";
    btn_agregar.style.border = "none";
    btn_agregar.style.color = "white";
    btn_agregar.style.borderRadius = "4px";
    btn_agregar.style.cursor = "pointer";
    btn_agregar.style.transition = "background-color 0.3s";

    // Estilizar el botón "Reset"
    btn_reset.style.padding = "0.5rem 1rem";
    btn_reset.style.backgroundColor = "#dc3545";
    btn_reset.style.border = "none";
    btn_reset.style.color = "white";
    btn_reset.style.borderRadius = "4px";
    btn_reset.style.cursor = "pointer";
    btn_reset.style.transition = "background-color 0.3s";

    // Agregar efectos de hover para ambos botones
    btn_agregar.addEventListener("mouseover", function() {
        btn_agregar.style.backgroundColor = "#218838";
    });
    btn_agregar.addEventListener("mouseout", function() {
        btn_agregar.style.backgroundColor = "#28a745";
    });

    btn_reset.addEventListener("mouseover", function() {
        btn_reset.style.backgroundColor = "#c82333";
    });
    btn_reset.addEventListener("mouseout", function() {
        btn_reset.style.backgroundColor = "#dc3545";
    });

    // Función para agregar tarea
    btn_agregar.addEventListener("click", function agregarTarea() {
        let tareaTexto = usuarioinput.value.trim();
        if (!tareaTexto) {
            console.error("El campo de tarea está vacío.");
            return;
        }

        // Crear nueva fila y celdas
        let nuevaFila = document.createElement("tr");
        let nuevaCeldaSinHacer = document.createElement("td");
        let nodoTexto = document.createTextNode(tareaTexto);
        let nuevaCeldaHechas = document.createElement("td");

        // Crear el botón "HECHO"
        let boton_done = document.createElement("button");
        boton_done.textContent = "HECHO";
        boton_done.style.backgroundColor = "green";
        boton_done.style.border = "none";
        boton_done.style.color = "white";
        boton_done.style.width = "60px";
        boton_done.style.height = "30px";
        boton_done.style.marginLeft = "5px";
        boton_done.style.borderRadius = "4px";
        boton_done.style.cursor = "pointer";
        boton_done.style.transition = "background-color 0.3s";

        // AGREGAR
        nuevaCeldaSinHacer.appendChild(nodoTexto);
        nuevaCeldaSinHacer.appendChild(boton_done);
        nuevaFila.appendChild(nuevaCeldaSinHacer);
        nuevaFila.appendChild(nuevaCeldaHechas);

        contenedor_tareas.appendChild(nuevaFila);

        // Limpiar el campo de entrada después de agregar la tarea
        usuarioinput.value = '';

        boton_done.addEventListener("click", function() {
            let filas = contenedor_tareas.querySelectorAll("tr");
            let filaEncontrada = null;

            // Encontrar la primera fila con una celda vacía en la segunda columna
            for (let fila of filas) {
                let celdaHechas = fila.children[1];
                if (celdaHechas && !celdaHechas.textContent.trim()) {
                    filaEncontrada = fila;
                    break;
                }
            }

            if (!filaEncontrada) {
                // Si no hay filas vacías, crear una nueva fila
                filaEncontrada = document.createElement("tr");
                let nuevaCeldaSinHacer = document.createElement("td");
                let nuevaCeldaHechas = document.createElement("td");
                filaEncontrada.appendChild(nuevaCeldaSinHacer);
                filaEncontrada.appendChild(nuevaCeldaHechas);
                contenedor_tareas.appendChild(filaEncontrada);
            }

            let celdaHechas = filaEncontrada.children[1];
            if (celdaHechas) {
                celdaHechas.textContent = tareaTexto;
            }

            // Limpiar la celda de la primera columna en la fila actual
            let celdaActual = boton_done.parentElement;
            if (celdaActual) {
                celdaActual.innerHTML = ''; // Limpiar el contenido y dejar la celda vacía
            }
        });
    });

    // Función para limpiar la tabla y el campo de entrada
    btn_reset.addEventListener("click", function() {
        // Limpiar todas las filas en la tabla
        contenedor_tareas.innerHTML = '';
        // Limpiar el campo de entrada
        usuarioinput.value = '';
    });
});
