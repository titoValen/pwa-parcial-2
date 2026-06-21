import { obtenerUbicacion } from "../js/api.js";

export const modalAgregar = () => {
  const dialogEl = document.createElement("dialog");
  dialogEl.id = "modal";
  dialogEl.innerHTML = `
    <form id="form" method="dialog">
      <h2>Agregar lugar</h2>
      <label>
        Nombre:
        <input type="text" id="nombre" required />
      </label>
      <label>
        Descripción:
        <textarea id="descripcion"></textarea>
      </label>
      <label>
        Latitud:
        <input type="number" id="latitud" step="any" required readonly />
      </label>
      <label>
        Longitud:
        <input type="number" id="longitud" step="any" required readonly />
      </label>
      <button type="button" id="btnGps">Obtener ubicación</button>
      <div class="container-btn">
        <button type="submit" id="formAdd" value="submit">Guardar</button>
        <button type="button" id="formClose">Cancelar</button>
      </div>
    </form>
  `;

  document.body.appendChild(dialogEl);
  dialogEl.showModal();

  const formEl = dialogEl.querySelector("#form");

  const btnClose = dialogEl.querySelector("#formClose");
  btnClose.addEventListener("click", () => {
    dialogEl.close("cancel");
  });

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = dialogEl.querySelector("#nombre").value.trim();
    const descripcion = dialogEl.querySelector("#descripcion").value.trim();
    const latitud = parseFloat(dialogEl.querySelector("#latitud").value);
    const longitud = parseFloat(dialogEl.querySelector("#longitud").value);

    if (!nombre || !descripcion || Number.isNaN(latitud) || Number.isNaN(longitud)) {
      alert("Completá todos los campos");
      return;
    }

    dialogEl.close("submit");
  });

  // Manejar obtener ubicación GPS
  const btnGps = dialogEl.querySelector("#btnGps");
  const inputLat = dialogEl.querySelector("#latitud");
  const inputLng = dialogEl.querySelector("#longitud");

  btnGps.addEventListener("click", async () => {
    try {
      btnGps.textContent = "Obteniendo...";
      const coords = await obtenerUbicacion();
      inputLat.value = coords.latitud;
      inputLng.value = coords.longitud;
      btnGps.textContent = "Ubicación obtenida";
    } catch (err) {
      alert(err.message);
      btnGps.textContent = "Obtener ubicación";
    }
  });

  return new Promise((resolve) => {
    dialogEl.addEventListener("close", () => {
      if (dialogEl.returnValue === "submit") {
        const nombre = dialogEl.querySelector("#nombre").value.trim();
        const descripcion = dialogEl.querySelector("#descripcion").value.trim();
        const latitud = parseFloat(dialogEl.querySelector("#latitud").value);
        const longitud = parseFloat(dialogEl.querySelector("#longitud").value);

        if (!nombre || !descripcion || Number.isNaN(latitud) || Number.isNaN(longitud)) {
          alert("Completá todos los campos");
          return;
        }

        resolve({
          nombre,
          descripcion,
          latitud,
          longitud,
          fecha: new Date().toISOString(),
        });
      } else {
        resolve(null);
      }
      
      // Limpiar el diálogo del DOM después de cerrarse
      dialogEl.remove();
    });
  });
};

export const modalEditar = (lugar) => {
  const dialogEl = document.createElement("dialog");
  dialogEl.id = "modal";
  dialogEl.innerHTML = `
    <form id="form" method="dialog">
      <h2>Modificar lugar</h2>
      <label>
        Nombre:
        <input type="text" id="nombre" value="${lugar.nombre}" required />
      </label>
      <label>
        Descripción:
        <textarea id="descripcion">${lugar.descripcion}</textarea>
      </label>
      <div class="container-btn">
        <button type="submit" id="formAdd" value="submit">Guardar</button>
        <button type="button" id="formClose">Cancelar</button>
      </div>
    </form>
  `;
  document.body.appendChild(dialogEl);
  dialogEl.showModal();

  const formEl = dialogEl.querySelector("#form");

  const btnClose = dialogEl.querySelector("#formClose");
  btnClose.addEventListener("click", () => {
    dialogEl.close("cancel");
  });

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = dialogEl.querySelector("#nombre").value.trim();
    const descripcion = dialogEl.querySelector("#descripcion").value.trim();

    if (!nombre || !descripcion) {
      alert("Completá los campos para modificar el lugar");
      return;
    }

    dialogEl.close("submit");
  });

  return new Promise((resolve) => {
    dialogEl.addEventListener("close", () => {
      if (dialogEl.returnValue === "submit") {
        const nombre = dialogEl.querySelector("#nombre").value.trim();
        const descripcion = dialogEl.querySelector("#descripcion").value.trim();

        if (!nombre || !descripcion) {
          alert("Completá los campos para modificar el lugar");
          return;
        }

        resolve({
          nombre,
          descripcion,
        });
      } else {
        resolve(null);
      }
      
      // Limpiar el diálogo del DOM después de cerrarse
      dialogEl.remove();
    });
  });
};

