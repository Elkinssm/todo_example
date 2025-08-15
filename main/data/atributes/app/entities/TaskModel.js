/**
 * Modelo que representa una tarea
 */
class TaskModel {
  constructor(id, title, description, status, createdAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
  }

  /**
   * Crea una tarea desde datos de la API
   */
  static fromApi(data) {
    return new TaskModel(
      data.id,
      data.title,
      data.description,
      data.status,
      data.createdAt
    );
  }

  /**
   * Marca la tarea como terminada
   */
  markAsFinished() {
    this.status = "finished";
    return this;
  }

  /**
   * Verifica si la tarea está terminada
   */
  isFinished() {
    return this.status === "finished";
  }

  /**
   * Verifica si la tarea está pendiente
   */
  isPending() {
    return this.status === "pending";
  }
}

module.exports = TaskModel;
