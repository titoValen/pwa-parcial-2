import { crearCard } from "../components/card.js";
import { modalAgregar } from "../components/modal.js";
import {
  guardarLugar,
  obtenerLugares,
  eliminarLugar,
  actualizarLugar,
} from "./storage.js";
import { compartirLugar, obtenerUbicacion } from "./api.js";

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
    const cardEl = crearCard(lugar, {
      onCompartir: compartirLugar,
      onEditar: async (lugarEditado) => {
        await actualizarLugar(lugarEditado);
        renderCards(await obtenerLugares());

        if (marcadores[lugarEditado.id]) {
          marcadores[lugarEditado.id].setPopupContent(
            `<b>${lugarEditado.nombre}</b><br>${lugarEditado.descripcion}`,
          );
        }
      },
      onEliminar: async (idLugar) => {
        await eliminarLugar(idLugar);

        if (marcadores[idLugar]) {
          map.removeLayer(marcadores[idLugar]);
          delete marcadores[idLugar];
        }

        renderCards(await obtenerLugares());
      },
    });

    seccion.appendChild(cardEl);
  });
};

// ─── Cargar lugares al inicio ────────────────────────
const cargarLugares = async () => {
  const lugares = await obtenerLugares();
  renderCards(lugares);
};

cargarLugares();

// ─── Agregar nuevo lugar ────────────────────────────
const btnAgregar = document.querySelector('#openModal');

btnAgregar.addEventListener("click", async () => {
  const lugar = await modalAgregar();
  
  if (lugar) {
    const id = await guardarLugar(lugar);
    lugar.id = id;

    agregarMarcador(lugar);
    renderCards(await obtenerLugares());
    map.setView([lugar.latitud, lugar.longitud], 15);
  }
});

// ─── Banner offline ──────────────────────────────────
const banner = document.querySelector("#banner-offline");

window.addEventListener("offline", () => (banner.style.display = "block"));
window.addEventListener("online", () => (banner.style.display = "none"));
