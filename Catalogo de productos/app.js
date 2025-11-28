// Referencias al DOM
const btnAdd = document.getElementById("btn-add");
const formContainer = document.getElementById("form-container");
const catalogo = document.getElementById("catalogo");

// Array donde guardamos los productos
let productos = [];

// ---------------------------
//   MOSTRAR FORMULARIO
// ---------------------------
function mostrarFormulario() {
  // Si ya existe el formulario, no lo dupliques
  if (document.getElementById("form-producto")) return;

  const form = document.createElement("form");
  form.id = "form-producto";

  form.innerHTML = `
        <h3>Nuevo producto</h3>

        <label>ID del producto:</label><br>
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

  // Botón guardar
  document.getElementById("btn-guardar").addEventListener("click", () => {
    validarYGuardar(form);
  });
}

btnAdd.addEventListener("click", mostrarFormulario);

// ---------------------------
//   VALIDACIÓN DEL FORMULARIO
// ---------------------------
function validarYGuardar(form) {
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

  // Función para mostrar errores
  function mostrarError(campo, mensaje) {
    const p = document.createElement("p");
    p.className = "error-msg";
    p.style.color = "red";
    p.textContent = mensaje;
    campo.insertAdjacentElement("afterend", p);
  }

  // VALIDACIONES
  if (id === "") {
    mostrarError(document.getElementById("prod-id"), "El ID es obligatorio");
    valido = false;
  } else if (productos.some((p) => p.id === id)) {
    mostrarError(document.getElementById("prod-id"), "Este ID ya existe");
    valido = false;
  }

  if (nombre === "") {
    mostrarError(
      document.getElementById("prod-nombre"),
      "El nombre es obligatorio"
    );
    valido = false;
  }

  if (precio === "" || isNaN(precio) || Number(precio) <= 0) {
    mostrarError(document.getElementById("prod-precio"), "Precio inválido");
    valido = false;
  }

  if (!img) {
    mostrarError(
      document.getElementById("prod-img"),
      "Debe seleccionar una imagen"
    );
    valido = false;
  }

  if (!valido) return;

  // Crear producto
  const nuevoProducto = {
    id,
    nombre,
    desc,
    precio: Number(precio),
    img: URL.createObjectURL(img),
  };

  productos.push(nuevoProducto);

  // Crear tarjeta visual
  crearTarjeta(nuevoProducto);

  // Eliminar formulario
  form.remove();
}

// ---------------------------
//   CREAR TARJETA EN CATÁLOGO
// ---------------------------
function crearTarjeta(producto) {
  const card = document.createElement("div");
  card.style.border = "1px solid black";
  card.style.padding = "10px";
  card.style.width = "200px";
  card.style.position = "relative";
  card.style.textAlign = "center";

  // Imagen
  const img = document.createElement("img");
  img.src = producto.img;
  img.width = 180;

  // Nombre (solo al pasar ratón)
  const nombre = document.createElement("div");
  nombre.textContent = producto.nombre;
  nombre.style.position = "absolute";
  nombre.style.bottom = "10px";
  nombre.style.left = "0";
  nombre.style.width = "100%";
  nombre.style.background = "rgba(0,0,0,0.7)";
  nombre.style.color = "white";
  nombre.style.padding = "5px 0";
  nombre.style.display = "none";

  img.addEventListener("mouseover", () => {
    nombre.style.display = "block";
  });

  img.addEventListener("mouseout", () => {
    nombre.style.display = "none";
  });

  // Zona de detalles
  const detalles = document.createElement("div");
  detalles.style.display = "none";
  detalles.style.marginTop = "10px";
  detalles.style.borderTop = "1px solid gray";
  detalles.style.paddingTop = "10px";
  detalles.innerHTML = `
        <strong>ID:</strong> ${producto.id}<br>
        <strong>Nombre:</strong> ${producto.nombre}<br>
        <strong>Precio:</strong> ${producto.precio} €<br>
        <strong>Descripción:</strong> ${producto.desc}<br>
    `;

  // Click en la imagen → mostrar detalles
  img.addEventListener("click", () => {
    detalles.style.display =
      detalles.style.display === "none" ? "block" : "none";
  });

  // Montar tarjeta
  card.appendChild(img);
  card.appendChild(nombre);
  card.appendChild(detalles);

  catalogo.appendChild(card);
}
