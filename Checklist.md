# ✅ Checklist — WanderLog PWA

Seguimiento paso a paso del desarrollo del TP2.

---

## 📁 1. Estructura y setup inicial

- [X] Crear carpeta del proyecto con la estructura sugerida
- [X] Crear `index.html` base con meta viewport y links
- [X] Crear `css/style.css` para estilos propios
- [X] Crear archivos vacíos: `js/app.js`, `js/storage.js`, `js/api.js`, `sw.js`, `manifest.json`
- [X] Crear `offline.html` (puede completarse después)
- [X] Inicializar repositorio Git y primer commit

---

## 🖼️ 2. Íconos y assets

- [X] Crear o descargar ícono de la app en PNG
- [X] Generar versiones de 192x192 y 512x512 px
- [X] Guardarlos en `/icons/`
- [X] Agregar cualquier imagen decorativa en `/assets/img/`

---

## 📄 3. manifest.json

- [X] Definir `name` (nombre completo)
- [X] Definir `short_name`
- [X] Definir `start_url`
- [X] Definir `display: standalone`
- [X] Definir `background_color` y `theme_color`
- [X] Agregar los íconos (192 y 512)
- [X] Linkear el manifest en el `<head>` del HTML
- [X] Verificar en DevTools > Application > Manifest que no hay errores

---

## ⚙️ 4. Service Worker (sw.js)

- [X] Definir nombre y versión del caché (`CACHE_NAME`)
- [X] Listar todos los archivos a cachear en `urlsToCache`
- [X] Implementar evento `install` (pre-cacheo de assets)
- [X] Implementar evento `activate` (limpieza de cachés viejas)
- [X] Implementar evento `fetch` con estrategia **Cache First**
- [ ] Redirigir a `offline.html` cuando no hay red y el recurso no está en caché
- [ ] Registrar el SW desde `app.js` con `navigator.serviceWorker.register`
- [X] Verificar en DevTools > Application > Service Workers que está activo

---

## 💾 5. IndexedDB (storage.js)

- [X] Crear función `initDB()` que abre/crea la base de datos
- [X] Definir el object store `lugares` con autoincrement
- [X] Crear función `guardarLugar(lugar)` — Create
- [X] Crear función `obtenerLugares()` — Read (todos)
- [X] Crear función `actualizarLugar(id, datos)` — Update
- [X] Crear función `eliminarLugar(id)` — Delete
- [X] Exportar todas las funciones para usar desde `app.js`

---

## 🌍 6. Geolocation API (api.js)

- [X] Crear función `obtenerUbicacion()` que retorna una Promise
- [ ] Manejar el caso de permiso denegado con mensaje claro
- [ ] Mostrar latitud y longitud en el formulario al obtener ubicación
- [ ] Manejar error si el navegador no soporta geolocalización

---

## 🔗 7. Web Share API (api.js)

- [X] Crear función `compartirLugar(lugar)` usando `navigator.share`
- [ ] Armar el texto a compartir (nombre + coordenadas + descripción)
- [X] Verificar si el navegador soporta `navigator.share` antes de llamarla
- [ ] Mostrar/ocultar el botón compartir según soporte del navegador

---

## 🗺️ 8. Mapa con Leaflet.js

- [ ] Agregar Leaflet CSS y JS via CDN en el HTML
- [ ] Crear contenedor `<div id="mapa">` en el HTML
- [ ] Inicializar el mapa centrado en una posición por defecto
- [ ] Al registrar un lugar, colocar un marcador en el mapa
- [ ] Al cargar el historial, mostrar todos los marcadores guardados
- [ ] Al hacer click en un marcador, mostrar nombre y descripción

---

## 🖥️ 9. Interfaz de usuario (index.html + app.js)

- [ ] Crear formulario para nuevo lugar (nombre, descripción, botón GPS)
- [ ] Crear listado de lugares guardados (cards)
- [ ] Cada card debe tener botones de editar, eliminar y compartir
- [ ] Implementar lógica de edición inline o modal
- [ ] Mostrar banner/alerta cuando el dispositivo está offline
- [ ] Escuchar eventos `online` y `offline` del navegador
- [ ] Diseño responsive y mobile first con Tailwind

---

## 📴 10. Página offline (offline.html)

- [ ] Crear página con diseño acorde a la app
- [ ] Mostrar mensaje amigable de sin conexión
- [ ] Incluir botón para reintentar / volver
- [ ] Asegurarse de que esta página esté en el caché del SW

---

## 🧪 11. Testing y verificación

- [ ] Probar instalación de la app (botón "Instalar" en el navegador)
- [ ] Probar modo offline en DevTools > Network > Offline
- [ ] Verificar que la página offline aparece correctamente sin red
- [ ] Verificar que los lugares guardados se ven sin conexión
- [ ] Probar CRUD completo: crear, ver, editar y eliminar un lugar
- [ ] Probar Geolocation en el navegador
- [ ] Probar Web Share en mobile
- [ ] Correr Lighthouse en DevTools y verificar score PWA

---

## 🚀 12. Deploy y entrega

- [ ] Hacer commit final con todo el código limpio
- [ ] Subir a GitHub con README incluido
- [ ] Publicar en Netlify o GitHub Pages
- [ ] Verificar que la app funciona desde la URL publicada
- [ ] Copiar link del repositorio y del deploy para entregar
