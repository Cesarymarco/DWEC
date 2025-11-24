// Seleccionamos el botón y el contenedor donde irá el formulario
const btnAdd = document.getElementById("btn-add");
const formContainer = document.getElementById("form-container");

// Función que crea el formulario dinámicamente
function mostrarFormulario() {
  // Si ya existe un formulario, no crear otro
  if (document.getElementById("form-producto")) return;

  // Crear formulario
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

  // Insertar en el contenedor
  formContainer.appendChild(form);

  // Evento del botón cancelar → elimina el formulario
  document.getElementById("btn-cancelar").addEventListener("click", () => {
    form.remove();
  });

  // Evento del botón guardar (aún no hace nada)
  document.getElementById("btn-guardar").addEventListener("click", () => {
    alert("Aquí guardaremos el producto en la siguiente parte.");
  });
}

// Mostrar formulario al pulsar el botón principal
btnAdd.addEventListener("click", mostrarFormulario);
