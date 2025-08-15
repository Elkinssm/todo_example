const { sendRequestAsync } = require("../utils/https");

/**
 * Obtiene todas las tareas desde la API.
 * @async
 * @param {Object} params - Parámetros de la función
 * @param {string} params.api - URL base de la API
 * @returns {Promise<Array>} Lista de tareas
 * @throws {Error} Si hay un error en la petición HTTP
 */
async function getTasks({ api }) {
  return await sendRequestAsync({
    url: api + "/tasks",
    method: "GET",
    headers: {
      "Accept-Language": "es-CO",
    },
    dataType: "json",
  });
}

/**
 * Crea una nueva tarea en la API.
 * @async
 * @param {Object} params - Parámetros de la función
 * @param {string} params.api - URL base de la API
 * @param {Object} params.taskData - Datos de la tarea a crear
 * @returns {Promise<Object>} Tarea creada
 * @throws {Error} Si hay un error en la petición HTTP
 */
async function createTask({ api, taskData }) {
  return await sendRequestAsync({
    url: api + "/tasks",
    method: "POST",
    headers: {
      "Accept-Language": "es-CO",
      "Content-Type": "application/json",
    },
    data: taskData,
    dataType: "json",
  });
}

/**
 * Elimina una tarea por ID desde la API.
 * @async
 * @param {Object} params - Parámetros de la función
 * @param {string} params.api - URL base de la API
 * @param {string} params.id - ID de la tarea a eliminar
 * @returns {Promise<Object>} Resultado de la eliminación
 * @throws {Error} Si hay un error en la petición HTTP
 */
async function deleteTask({ api, id }) {
  return await sendRequestAsync({
    url: api + `/tasks/delete/${id}`,
    method: "DELETE",
    headers: {
      "Accept-Language": "es-CO",
    },
    dataType: "json",
  });
}

/**
 * Marca una tarea como terminada en la API.
 * @async
 * @param {Object} params - Parámetros de la función
 * @param {string} params.api - URL base de la API
 * @param {string} params.id - ID de la tarea a marcar como terminada
 * @returns {Promise<Object>} Tarea actualizada
 * @throws {Error} Si hay un error en la petición HTTP
 */
async function markTaskAsFinished({ api, id }) {
  return await sendRequestAsync({
    url: api + `/tasks/mark_as_finished/${id}`,
    method: "PATCH",
    headers: {
      "Accept-Language": "es-CO",
      "Content-Type": "application/json",
    },
    data: { status: "finished" },
    dataType: "json",
  });
}

/**
 * Obtiene tareas por estado desde la API.
 * @async
 * @param {Object} params - Parámetros de la función
 * @param {string} params.api - URL base de la API
 * @param {string} params.status - Estado de las tareas a obtener
 * @returns {Promise<Array>} Lista de tareas filtradas por estado
 * @throws {Error} Si hay un error en la petición HTTP
 */
async function getTasksByStatus({ api, status }) {
  return await sendRequestAsync({
    url: api + `/tasks/status/${status}`,
    method: "GET",
    headers: {
      "Accept-Language": "es-CO",
    },
    dataType: "json",
  });
}

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  markTaskAsFinished,
  getTasksByStatus,
};
