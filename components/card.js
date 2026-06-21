export const crearCard = (lugar, { onCompartir, onEditar, onEliminar } = {}) => {
  const cardEl = document.createElement("article");
  cardEl.className = "card";
  cardEl.innerHTML = `
    <h3>${lugar.nombre}</h3>
    <p>${lugar.descripcion}</p>
    <div class="card-info">
      <span>${lugar.latitud.toFixed(4)}, ${lugar.longitud.toFixed(4)}</span>
      <span>${new Date(lugar.fecha).toLocaleDateString("es-AR")}</span>
    </div>
    <div class="card-btns">
      <button class="btn-compartir">Compartir</button>
      <button class="btn-editar">Editar</button>
      <button class="btn-eliminar">Eliminar</button>
    </div>
  `;

  // Eventos de los botones
  const btnCompartir = cardEl.querySelector(".btn-compartir");
  const btnEditar = cardEl.querySelector(".btn-editar");
  const btnEliminar = cardEl.querySelector(".btn-eliminar");

  btnCompartir.addEventListener("click", () => {
    onCompartir?.(lugar);
  });

  btnEditar.addEventListener("click", async () => {
    const nuevoNombre = prompt("Nuevo nombre:", lugar.nombre);
    const nuevaDescripcion = prompt("Nueva descripción:", lugar.descripcion);
    if (nuevoNombre === null || nuevaDescripcion === null) {
      return;
    }

    const nombre = nuevoNombre.trim();
    const descripcion = nuevaDescripcion.trim();
    if (!nombre || !descripcion) {
      alert("Nombre y descripción no pueden estar vacíos");
      return;
    }

    await onEditar?.({
      ...lugar,
      nombre,
      descripcion,
    });
  });

  btnEliminar.addEventListener("click", async () => {
    await onEliminar?.(lugar.id);
  });

  return cardEl;
};