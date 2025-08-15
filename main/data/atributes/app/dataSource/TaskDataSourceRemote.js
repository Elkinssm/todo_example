const taskRemote = require("../source/AppRemote");
const APIs = require("../../../config/remote/apiConfig");

/**
 * Clase que implementa el patrón Singleton para manejar las fuentes de datos de tareas
 * @class
 */
class TaskDataSourceRemote {
  /** @type {TaskDataSourceRemote} Instancia única de la clase */
  static instance;

  /**
   * Crea o retorna la instancia única de TaskDataSourceRemote
   * @constructor
   * @returns {TaskDataSourceRemote} Instancia única de la clase
   */
  constructor() {
    if (TaskDataSourceRemote.instance) {
      return TaskDataSourceRemote.instance;
    } else {
      TaskDataSourceRemote.instance = this;
    }
  }

  /**
   * Obtiene todas las tareas
   * @async
   * @returns {Promise<Array>} Lista de tareas
   * @throws {Error} Si hay un error en la petición HTTP
   */
  getTasks() {
    console.log("🔗 TaskDataSourceRemote.getTasks() llamado");
    return taskRemote.getTasks({ api: APIs.URL_TASKS_API.base });
  }

  /**
   * Crea una nueva tarea
   * @async
   * @param {Object} taskData - Datos de la tarea a crear
   * @returns {Promise<Object>} Tarea creada
   * @throws {Error} Si hay un error en la petición HTTP
   */
  createTask(taskData) {
    return taskRemote.createTask({ api: APIs.URL_TASKS_API.base, taskData });
  }

  /**
   * Elimina una tarea por ID
   * @async
   * @param {string} id - ID de la tarea a eliminar
   * @returns {Promise<Object>} Resultado de la eliminación
   * @throws {Error} Si hay un error en la petición HTTP
   */
  deleteTask(id) {
    return taskRemote.deleteTask({ api: APIs.URL_TASKS_API.base, id });
  }

  /**
   * Marca una tarea como terminada
   * @async
   * @param {string} id - ID de la tarea a marcar como terminada
   * @returns {Promise<Object>} Tarea actualizada
   * @throws {Error} Si hay un error en la petición HTTP
   */
  markTaskAsFinished(id) {
    return taskRemote.markTaskAsFinished({ api: APIs.URL_TASKS_API.base, id });
  }

  /**
   * Obtiene tareas por estado
   * @async
   * @param {string} status - Estado de las tareas a obtener
   * @returns {Promise<Array>} Lista de tareas filtradas por estado
   * @throws {Error} Si hay un error en la petición HTTP
   */
  getTasksByStatus(status) {
    return taskRemote.getTasksByStatus({
      api: APIs.URL_TASKS_API.base,
      status,
    });
  }
}

module.exports = {
  TaskDataSourceRemote,
};
