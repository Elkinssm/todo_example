/**
 * Clase que representa las claves de la aplicación.
 */
module.exports = class Keys {
  /**
   * Obtiene las claves de tareas.
   *
   * @returns {object} - Un objeto que contiene las claves de tareas.
   */
  static get TASK() {
    return TASK;
  }
};

const TASK = {
  TASKS_LIST: "TASKS_LIST",
  TASK_BY_ID: "TASK_BY_ID",
  TASKS_BY_STATUS: "TASKS_BY_STATUS",
};
