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

}

module.exports = TaskModel;
