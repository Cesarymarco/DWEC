// Referencias al DOM
const btnAdd = document.getElementById("btn-add");
const formContainer = document.getElementById("form-container");
const catalogo = document.getElementById("catalogo");

// Array donde guardaremos los productos (sirve para validar ID repetida)
let productos = [];

// Función para mostrar el formulario dinámicamente
function mostrarFormulario() {
  // Si ya existe, no lo crees otra vez
  if (document.getElementById("form-producto")) return;

  const form = document.createElement("form");
  form.id = "form-producto";

  form.innerHTML = `
        <h3>Nuevo producto</h3>

        <label>Id del producto:</label><br>
        <input type="text" id="prod-id"><br><br>

        <label>Nombre:</label><br>
        <input type="text" id="prod-nombre"><br><br>

        <label>Descripción:</label><br>
        <textarea id="prod-desc"></textarea><br><br>

        <label>Precio (€):</label><br>
        <input type="text" id="prod-precio"><br><br>

        <label>Imagen:</label><br>
        <input type="file" id="prod-img" accept="image/*"><br><br>

        <button type="button" id="btn-guardar">Guardar producto</button>
        <button type="button" id="btn-cancelar">Cancelar</button>
    `;

  formContainer.appendChild(form);

  // Botón cancelar
  document.getElementById("btn-cancelar").addEventListener("click", () => {
    form.remove();
  });

  // BOTÓN GUARDAR (VALIDACIÓN)
  document.getElementById("btn-guardar").addEventListener("click", () => {
    // Borrar errores anteriores
    const erroresPrevios = form.querySelectorAll(".error-msg");
    erroresPrevios.forEach((e) => e.remove());

    let valido = true;

    // Recuperar valores
    const id = document.getElementById("prod-id").value.trim();
    const nombre = document.getElementById("prod-nombre").value.trim();
    const desc = document.getElementById("prod-desc").value.trim();
    const precio = document.getElementById("prod-precio").value.trim();
    const img = document.getElementById("prod-img").files[0];

    // Función auxiliar para mostrar errores
    function mostrarError(campo, mensaje) {
      const p = document.createElement("p");
      p.className = "error-msg";
      p.style.color = "red";
      p.textContent = mensaje;
      campo.insertAdjacentElement("afterend", p);
    }

    // VALIDACIÓN ID
    if (id === "") {
      mostrarError(document.getElementById("prod-id"), "El ID es obligatorio");
      valido = false;
    } else if (productos.some((p) => p.id === id)) {
      mostrarError(document.getElementById("prod-id"), "Este ID ya existe");
      valido = false;
    }

    // VALIDACIÓN NOMBRE
    if (nombre === "") {
      mostrarError(
        document.getElementById("prod-nombre"),
        "El nombre es obligatorio"
      );
      valido = false;
    }

    // VALIDACIÓN PRECIO
    if (precio === "" || isNaN(precio) || Number(precio) <= 0) {
      mostrarError(document.getElementById("prod-precio"), "Precio inválido");
      valido = false;
    }

    // VALIDACIÓN IMAGEN
    if (!img) {
      mostrarError(
        document.getElementById("prod-img"),
        "Debe seleccionar una imagen"
      );
      valido = false;
    }

    // SI HAY ERRORES → detener guardado
    if (!valido) return;

    // Si todo es correcto, crear el objeto producto
    const nuevoProducto = {
      id,
      nombre,
      desc,
      precio: Number(precio),
      img: URL.createObjectURL(img), // genera URL temporal
    };

    // Guardarlo en el array
    productos.push(nuevoProducto);

    alert("Producto válido. En la PARTE 4 lo mostraremos en el catálogo.");

    // Eliminar formulario
    form.remove();
  });
}

// Evento para mostrar formulario
btnAdd.addEventListener("click", mostrarFormulario);

// Comprobación
console.log("JS cargado (PARTE 3)");
