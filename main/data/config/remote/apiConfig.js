/**
 * Obtiene el tipo de clave.
 *
 * @returns {object} - Un objeto que contiene las URLs base de los servicios.
 */
module.exports = class APIs {
  /**
   * Obtiene la URL base de los servicios.
   *
   * @returns {object} - Un objeto que contiene las URLs base de los servicios.
   */
  static get URL_TASKS_API() {
    return {
      base: "http://localhost:8080",
      tasks: "http://localhost:8080/tasks",
      taskDelete: "http://localhost:8080/tasks/delete",
      taskMarkFinished: "http://localhost:8080/tasks/mark_as_finished",
      tasksByStatus: "http://localhost:8080/tasks/status",
    };
  }
};
