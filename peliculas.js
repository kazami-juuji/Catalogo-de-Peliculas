class catalogoPeliculas {

    mostrarOcultar(mode) {
        let formacontenedor = document.getElementById('form-container');
        let botonGuardar = document.getElementById('save-button');
        let editButton = document.getElementById('edit-button');

        formacontenedor.style.display = formacontenedor.style.display === 'block' ? 'none' : 'block';

        if (mode === 'add') {
            botonGuardar.style.display = 'block';
            editButton.style.display = 'none';
        } else if (mode === 'edit') {
            botonGuardar.style.display = 'none';
            editButton.style.display = 'block';
        }
        if (formacontenedor.style.display === 'none') {
            document.getElementById('movie-index').value = '';
            document.getElementById('movie-name').value = '';
            document.getElementById('movie-genre').value = '';
            document.getElementById('movie-cost').value = '';
        }
    }

    agregarPelicula() {
        let nombre = document.getElementById('movie-name').value;
        let genero = document.getElementById('movie-genre').value;
        let costo = document.getElementById('movie-cost').value;

        if (nombre === "" || genero === "" || costo === "") {
            Swal.fire({
                icon: "error",
                title: "Rellene todos los campos por favor",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
            return;
        }

        
        let mainContainer = document.getElementById('main-container');

        let nuevaFlecha = document.createElement('div');
        nuevaFlecha.classList.add('row');

        let nombreCol = document.createElement('div');
        nombreCol.classList.add('col');
        nombreCol.textContent = nombre;

        let generoCol = document.createElement('div');
        generoCol.classList.add('col');
        generoCol.textContent = genero;

        let precioCol = document.createElement('div');
        precioCol.classList.add('col');
        precioCol.textContent = "$" + parseFloat(costo).toFixed(2);

        let accionesCol = document.createElement('div');
        accionesCol.classList.add('col');
        let editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => { this.editarPelicula(editButton) };
        
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => { this.eliminarPelicula(deleteButton) };

        accionesCol.appendChild(editButton);
        accionesCol.appendChild(deleteButton);

        nuevaFlecha.appendChild(nombreCol);
        nuevaFlecha.appendChild(generoCol);
        nuevaFlecha.appendChild(precioCol);
        nuevaFlecha.appendChild(accionesCol);

        mainContainer.appendChild(nuevaFlecha);

        Swal.fire({
            title: "Maravilloso!",
            text: "Un peliculon mas a la lista",
            imageUrl: "./img/Frases.jpeg",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image"
          });
        this.mostrarOcultar('add');
    }

    editarPelicula(button) {
        let flecha = button.parentNode.parentNode;
        let index = Array.from(flecha.parentNode.children).indexOf(flecha) - 1;

        document.getElementById('movie-index').value = index;
        document.getElementById('movie-name').value = flecha.children[0].textContent;
        document.getElementById('movie-genre').value = flecha.children[1].textContent;
        document.getElementById('movie-cost').value = parseFloat(flecha.children[2].textContent.replace('$', ''));

        this.mostrarOcultar('edit');
    }

    guardarEdicion() {
        let index = document.getElementById('movie-index').value;
        let name = document.getElementById('movie-name').value;
        let genre = document.getElementById('movie-genre').value;
        let cost = document.getElementById('movie-cost').value;

        if (name === "" || genre === "" || cost === "") {
            Swal.fire({
                icon: "error",
                title: "Rellene todos los campos por favor",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
            return;
        }

        let rows = document.querySelectorAll('#main-container .row');
        let rowToEdit = rows[parseInt(index) + 1];

        if (!rowToEdit) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salio mal!",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
            return;
        }
        
        rowToEdit.children[0].textContent = name;
        rowToEdit.children[1].textContent = genre;
        rowToEdit.children[2].textContent = "$" + parseFloat(cost).toFixed(2);
        
        let timerInterval;
        Swal.fire({
          title: "Guardando cambios, espere un momento!",
          timer: 2500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
        this.mostrarOcultar('edit');
    }

    eliminarPelicula(button) {
        let row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
        Swal.fire({
            title: "Se eliminado la pelicula con exito",
            width: 500,
            padding: "5px",
            color: "red",
            background: "#fff url(./img/th1.jpeg)",
            backdrop: `
              rgba(0,0,123,0.4)
              url("/img/aaa.gif")
              left top
              no-repeat
            `
          });
    }
}

let objeto = new catalogoPeliculas();