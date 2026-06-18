const DB_NAME = "lugaresDB";
const DB_VERSION = 1;
const DB_STORE_NAME = "lugares";
let dbInstance = null;

export const initDB = () => {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    // Si tenemos error
    request.addEventListener("error", () => {
      reject(request.error);
    });

    // Resultado correcto
    request.addEventListener("success", () => {
      dbInstance = request.result;
      resolve(request.result);
    });

    // Creamos el Storage
    request.addEventListener("upgradeneeded", (e) => {
      const db = e.target.result;

      if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
        db.createObjectStore(DB_STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    });
  });
};

// Función para guardar un lugar
export const guardarLugar = async (lugar) => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(DB_STORE_NAME, "readwrite");
    const store = transaction.objectStore(DB_STORE_NAME);
    const request = store.add(lugar);

    request.addEventListener("success", () => {
      resolve(request.result);
    });

    request.addEventListener("error", () => {
      reject(request.error);
    });
  });
};

// Función para obtener un lugar
export const obtenerLugar = async (id) => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(DB_STORE_NAME, "readonly");
    const store = transaction.objectStore(DB_STORE_NAME);
    const request = store.get(id);

    request.addEventListener("success", () => {
      resolve(request.result);
    });

    request.addEventListener("error", () => {
      reject(request.error);
    });
  });
};

// Función para obtener todos los lugares
export const obtenerLugares = async () => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(DB_STORE_NAME, "readonly");
    const store = transaction.objectStore(DB_STORE_NAME);
    const request = store.getAll();

    request.addEventListener("success", () => {
      resolve(request.result);
    });

    request.addEventListener("error", () => {
      reject(request.error);
    });
  });
};

// Función para actualizar un lugar
export const actualizarLugar = async (id, datos) => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(DB_STORE_NAME, "readwrite");
    const store = transaction.objectStore(DB_STORE_NAME);

    // Compatibilidad: permite actualizarLugar({ id, ...datos })
    if (typeof id === "object" && id !== null) {
      const request = store.put(id);

      request.addEventListener("success", () => {
        resolve(request.result);
      });

      request.addEventListener("error", () => {
        reject(request.error);
      });

      return;
    }

    const getRequest = store.get(id);

    getRequest.addEventListener("success", () => {
      const lugarActual = getRequest.result;

      if (!lugarActual) {
        reject(new Error("No existe un lugar con ese id"));
        return;
      }

      const lugarActualizado = {
        ...lugarActual,
        ...datos,
        id,
      };

      const putRequest = store.put(lugarActualizado);

      putRequest.addEventListener("success", () => {
        resolve(putRequest.result);
      });

      putRequest.addEventListener("error", () => {
        reject(putRequest.error);
      });
    });

    getRequest.addEventListener("error", () => {
      reject(getRequest.error);
    });
  });
};

// Función para eliminar un lugar
export const eliminarLugar = async (id) => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(DB_STORE_NAME, "readwrite");
    const store = transaction.objectStore(DB_STORE_NAME);

    // Compatibilidad: permite eliminarLugar({ id })
    const idLugar = typeof id === "object" && id !== null ? id.id : id;
    const request = store.delete(idLugar);

    request.addEventListener("success", () => {
      resolve(request.result);
    });

    request.addEventListener("error", () => {
      reject(request.error);
    });
  });
};
