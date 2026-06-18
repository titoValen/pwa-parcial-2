export const obtenerUbicacion = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("TU navegador no soporta geolocalización"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitud: position.coords.latitude,
          longitud: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error("No se pudo obtener la ubicación: " + error.message));
      },
    );
  });
};

export const compartirLugar = async (lugar) => {
  if (!navigator.share) {
    alert("Tu navegador no soporta la API de Compartir");
    return;
  }

  await navigator.share({
    title: lugar.nombre,
    text: `📍 ${lugar.nombre}\n${lugar.descripcion}\n🌐 ${lugar.latitud}, ${lugar.longitud}`,
  });
};
