import { crearCard } from "../components/card.js";
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

  if (!nombre || Number.isNaN(latitud) || Number.isNaN(longitud)) {
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
