# 📍 WanderLog — Diario de Lugares Visitados

Una Progressive Web App (PWA) para registrar los lugares que visitás, con coordenadas automáticas, notas personales e historial offline.

---

## 🎯 Descripción

WanderLog te permite guardar cada lugar que visitás de forma rápida: con un toque obtiene tu ubicación actual, le ponés un nombre y una descripción, y queda guardado en tu historial para siempre, incluso sin internet.

---

## ✨ Funcionalidades

- 📌 **Registrar lugar actual** — Obtiene automáticamente las coordenadas GPS del dispositivo
- 🗒️ **Nombre y descripción** — Personalizás cada entrada con un título y notas
- 📋 **Historial de lugares** — Listado de todos los lugares guardados
- ✏️ **Editar y eliminar** — CRUD completo sobre cada registro
- 📴 **Modo offline** — Funciona sin conexión, con página offline personalizada
- 📲 **Instalable** — Se puede instalar como app nativa en Android/iOS/desktop
- 🔗 **Compartir lugar** — Compartís un lugar usando la Web Share API

---

## 🛠️ Tecnologías utilizadas

| Tecnología                     | Uso                               |
| ------------------------------ | --------------------------------- |
| HTML5 / CSS3 / JavaScript puro | Base de la aplicación             |
| Service Worker                 | Caché y funcionamiento offline    |
| Cache Storage (Cache First)    | Estrategia de caché de assets     |
| IndexedDB                      | Almacenamiento local de lugares   |
| Geolocation API                | Obtener coordenadas del usuario   |
| Web Share API                  | Compartir registros               |
| Leaflet.js                     | Visualización de mapa interactivo |

---

## 📁 Estructura del proyecto

```
WanderLog/
├── assets/
│   └── img/
├── css/
│   └── style.css
├── icons/
│   ├── icon-192x192.png
│   └── icon-512x512.png
├── js/
│   ├── app.js          # Lógica principal y UI
│   ├── storage.js      # Manejo de IndexedDB
│   └── api.js          # Geolocation y Web Share API
├── offline.html        # Página offline personalizada
├── index.html
├── manifest.json
└── sw.js               # Service Worker
```

---

## 🌐 APIs utilizadas

### Geolocation API (navegador)

Obtiene la posición actual del usuario al registrar un nuevo lugar. Muestra latitud, longitud y precisión.

### Web Share API (navegador)

Permite compartir el nombre y coordenadas de un lugar guardado a través de las apps del sistema (WhatsApp, mail, etc.).

---

## ⚙️ Service Worker — Estrategia Cache First

El Service Worker implementa una estrategia **Cache First**:

1. En el evento `install` se pre-cachean todos los assets estáticos
2. En el evento `fetch` se responde desde caché si existe, si no va a la red
3. En el evento `activate` se limpian cachés viejas

---

## 💾 Almacenamiento — IndexedDB

Se usa IndexedDB para persistir los registros de lugares con la siguiente estructura:

```js
{
  id: autoincrement,
  nombre: "Plaza Serrano",
  descripcion: "Feria de diseño los fines de semana",
  latitud: -34.5875,
  longitud: -58.4347,
  fecha: "2025-06-12T15:30:00"
}
```

Operaciones disponibles: **Crear, Leer, Actualizar y Eliminar**.

---

## 📴 Funcionamiento Offline

- Todos los assets se cachean en la instalación del SW
- Los lugares guardados persisten en IndexedDB sin necesidad de red
- Si se navega sin conexión se muestra una página `offline.html` personalizada
- Un banner en la UI indica cuando el dispositivo está sin conexión

---

## 🚀 Deploy

- Repositorio: `https://github.com/usuario/wanderlog`
- Demo en vivo: `https://wanderlog.netlify.app`

---

## 📋 Criterios cubiertos

| Criterio                                          | Estado |
| ------------------------------------------------- | ------ |
| Manifest y aplicación instalable                  | ✅     |
| Service Worker implementado                       | ✅     |
| Estrategia de caché (Cache First)                 | ✅     |
| Funcionamiento offline + página personalizada     | ✅     |
| Geolocation API + Web Share API                   | ✅     |
| IndexedDB con CRUD completo                       | ✅     |
| Extras: múltiples APIs + offline page + Web Share | ✅     |

---

## 👨‍💻 Autor

Trabajo Práctico N°2 — Aplicaciones Web Progresivas  
Diseño y Programación Web — Instituto Da Vinci
