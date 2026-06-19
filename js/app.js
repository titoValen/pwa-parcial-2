import {
  guardarLugar,
  obtenerLugares,
  eliminarLugar,
  actualizarLugar,
} from "./storage.js";
import { obtenerUbicacion, compartirLugar } from "./api.js";

// ─── Mapa ───────────────────────────────────────────
const map = L.map("mapa").setView([-34.6083, -58.3712], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(map);

const marcadores = {};

const agregarMarcador = (lugar) => {
  const marcador = L.marker([lugar.latitud, lugar.longitud])
    .addTo(map)
    .bindPopup(`<b>${lugar.nombre}</b><br>${lugar.descripcion}`);
  marcadores[lugar.id] = marcador;
};

// ─── Cards ──────────────────────────────────────────
const seccion = document.querySelector("section");

const renderCards = (lugares) => {
  seccion.innerHTML = "";
  lugares.forEach((lugar) => {
    const card = document.createElement("article");
    card.dataset.id = lugar.id;
    card.innerHTML = `
      <h3>${lugar.nombre}</h3>
      <p>${lugar.descripcion}</p>
      <span>${lugar.latitud.toFixed(4)}, ${lugar.longitud.toFixed(4)}</span>
      <span>${new Date(lugar.fecha).toLocaleDateString("es-AR")}</span>
      <div class="card-btns">
        <button class="btn-compartir">Compartir</button>
        <button class="btn-eliminar">Eliminar</button>
      </div>
    `;

    card.querySelector(".btn-compartir").addEventListener("click", () => {
      compartirLugar(lugar);
    });

    card.querySelector(".btn-eliminar").addEventListener("click", async () => {
      await eliminarLugar(lugar.id);
      if (marcadores[lugar.id]) {
        map.removeLayer(marcadores[lugar.id]);
        delete marcadores[lugar.id];
      }
      card.remove();
    });

    seccion.appendChild(card);
    agregarMarcador(lugar);
  });
};

// ─── Cargar lugares al inicio ────────────────────────
const cargarLugares = async () => {
  const lugares = await obtenerLugares();
  renderCards(lugares);
};

cargarLugares();

// ─── GPS en el formulario ────────────────────────────
const btnGps = document.querySelector("#btnGps");
const inputLat = document.querySelector("#latitud");
const inputLng = document.querySelector("#longitud");

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

// ─── Submit del formulario ───────────────────────────
const form = document.querySelector("#form");
const dialog = document.querySelector("#modal");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.querySelector("#nombre").value.trim();
  const descripcion = document.querySelector("#descripcion").value.trim();
  const latitud = parseFloat(inputLat.value);
  const longitud = parseFloat(inputLng.value);

  if (!nombre || !latitud || !longitud) {
    alert("Completá el nombre y obtené la ubicación");
    return;
  }

  const lugar = {
    nombre,
    descripcion,
    latitud,
    longitud,
    fecha: new Date().toISOString(),
  };
  const id = await guardarLugar(lugar);
  lugar.id = id;

  agregarMarcador(lugar);
  renderCards(await obtenerLugares());
  map.setView([latitud, longitud], 15);

  form.reset();
  btnGps.textContent = "Obtener ubicación";
  dialog.close();
});

// ─── Banner offline ──────────────────────────────────
const banner = document.querySelector("#banner-offline");

window.addEventListener("offline", () => (banner.style.display = "block"));
window.addEventListener("online", () => (banner.style.display = "none"));
