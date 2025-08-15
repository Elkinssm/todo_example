/**
 * Repositorio que gestiona las operaciones de tareas
 * Implementación simplificada sin dependencias externas
 */
class TaskRepository {
  constructor() {
    console.log(" TaskRepository constructor iniciado");
    this.baseUrl = "http://localhost:8080";
  }

  /**
   * Obtiene todas las tareas
   */
  async getTasks() {
    try {
      console.log("TaskRepository.getTasks() llamado");

      const result = await this.makeRequest({
        url: `${this.baseUrl}/tasks`,
        method: "GET",
      });

      console.log(" Tareas obtenidas exitosamente:", result);
      return { data: result.data || [] };
    } catch (error) {
      console.error(" Error en TaskRepository.getTasks():", error);
      throw new Error("Error al obtener las tareas");
    }
  }

  /**
   * Crea una nueva tarea
   */
  async createTask(taskData) {
    try {
      console.log("🔄 TaskRepository.createTask() llamado con:", taskData);

      const result = await this.makeRequest({
        url: `${this.baseUrl}/tasks`,
        method: "POST",
        data: taskData,
      });

      console.log(" Tarea creada exitosamente:", result);
      return { data: result.data };
    } catch (error) {
      console.error(" Error en TaskRepository.createTask():", error);
      throw new Error("Error al crear la tarea");
    }
  }

  /**
   * Elimina una tarea por ID
   */
  async deleteTask(taskId) {
    try {
      console.log(" TaskRepository.deleteTask() llamado con ID:", taskId);

      const result = await this.makeRequest({
        url: `${this.baseUrl}/tasks/delete/${taskId}`,
        method: "DELETE",
      });

      console.log(" Tarea eliminada exitosamente:", result);
      return { data: result.data };
    } catch (error) {
      console.error(" Error en TaskRepository.deleteTask():", error);
      throw new Error("Error al eliminar la tarea");
    }
  }

  /**
   * Marca una tarea como finalizada
   */
  async markTaskAsFinished(taskId) {
    try {
      console.log(
        "🔄 TaskRepository.markTaskAsFinished() llamado con ID:",
        taskId
      );

      const result = await this.makeRequest({
        url: `${this.baseUrl}/tasks/mark_as_finished/${taskId}`,
        method: "PATCH",
      });

      console.log("✅ Tarea marcada como finalizada:", result);
      return { data: result.data };
    } catch (error) {
      console.error(" Error en TaskRepository.markTaskAsFinished():", error);
      throw new Error("Error al marcar la tarea como finalizada");
    }
  }

  /**
   * Obtiene tareas por estado
   */
  async getTasksByStatus(status) {
    try {
      console.log(
        "�� TaskRepository.getTasksByStatus() llamado con status:",
        status
      );

      const result = await this.makeRequest({
        url: `${this.baseUrl}/tasks/status/${status}`,
        method: "GET",
      });

      console.log(" Tareas por status obtenidas exitosamente:", result);
      return { data: result.data || [] };
    } catch (error) {
      console.error(" Error en TaskRepository.getTasksByStatus():", error);
      throw new Error(`Error al obtener tareas con estado ${status}`);
    }
  }

  /**
   * Obtiene una tarea por ID
   */
  async getTaskById(taskId) {
    try {
      console.log("�� TaskRepository.getTaskById() llamado con ID:", taskId);

      const result = await this.makeRequest({
        url: `${this.baseUrl}/tasks/${taskId}`,
        method: "GET",
      });

      console.log(" Tarea por ID obtenida exitosamente:", result);
      return { data: result.data };
    } catch (error) {
      console.error(" Error en TaskRepository.getTaskById():", error);
      throw new Error("Error al obtener la tarea");
    }
  }

  /**
   * Método privado para hacer peticiones HTTP
   */
  makeRequest(requestConfig) {
    return new Promise((resolve, reject) => {
      const startTime = new Date();

      console.log(" Haciendo petición HTTP:", {
        url: requestConfig.url,
        method: requestConfig.method,
        data: requestConfig.data,
      });

      my.request({
        url: requestConfig.url,
        method: requestConfig.method,
        data: requestConfig.data || {},
        headers: requestConfig.headers || {},
        success: (res) => {
          console.log(" Petición HTTP exitosa:", {
            url: requestConfig.url,
            method: requestConfig.method,
            status: res.statusCode,
            duration: `${new Date() - startTime}ms`,
          });
          resolve(res);
        },
        fail: (res) => {
          console.error("Petición HTTP falló:", {
            url: requestConfig.url,
            method: requestConfig.method,
            error: res.error,
            duration: `${new Date() - startTime}ms`,
          });
          reject(res);
        },
        complete: (res) => {
          console.log(" Petición HTTP completada:", {
            url: requestConfig.url,
            method: requestConfig.method,
            status: res.statusCode || "N/A",
            duration: `${new Date() - startTime}ms`,
          });
        },
      });
    });
  }
}

module.exports = TaskRepository;
