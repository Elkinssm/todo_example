const TaskRepository = require('../data/atributes/app/repository/TaskRepository')

const taskRepository = new TaskRepository()

/**
 * Obtiene todas las tareas disponibles
 * @async
 * @returns {Promise<Array>} Lista de tareas
 * @throws {Error} Si no se recibieron tareas válidas
 * @throws {Error} Si hay un error en la petición HTTP
 */
async function fetchTasks() {
  try {
    console.log('TaskViewModel.fetchTasks() llamado')
    const { data } = await taskRepository.getTasks()
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('No se recibieron tareas válidas')
    }
    
    console.log(' Tareas obtenidas exitosamente:', data)
    return data
  } catch (error) {
    console.error(' Error en fetchTasks:', error)
    throw new Error('Error al obtener las tareas')
  }
}

/**
 * Crea una nueva tarea
 * @async
 * @param {Object} taskData - Datos de la tarea a crear
 * @param {string} taskData.title - Título de la tarea
 * @param {string} taskData.description - Descripción de la tarea
 * @param {string} taskData.eta - Fecha límite de la tarea (ISO string)
 * @returns {Promise<Object>} Tarea creada
 * @throws {Error} Si los datos de la tarea no son válidos
 * @throws {Error} Si hay un error en la petición HTTP
 * @example
 * // Crear una nueva tarea
 * const newTask = await createTask({
 *   title: 'Mi nueva tarea',
 *   description: 'Descripción de la tarea',
 *   eta: '2025-08-15T01:55:04.277Z'
 * })
 */
async function createTask(taskData) {
  try {
    if (!taskData.title || !taskData.title.trim()) {
      throw new Error('El título de la tarea es obligatorio', {
        cause: 'INVALID_TASK_DATA'
      })
    }

    // Solo enviar los campos que necesita la API
    const taskToCreate = {
      title: taskData.title.trim(),
      description: taskData.description ? taskData.description.trim() : '',
      eta: taskData.eta || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // ETA por defecto en 24 horas
    }

    console.log(' Datos a enviar a la API:', taskToCreate)

    const { data } = await taskRepository.createTask(taskToCreate)
    
    if (!data) {
      throw new Error('No se pudo crear la tarea')
    }
    
    return data
  } catch (error) {
    switch (error.cause) {
      case 'INVALID_TASK_DATA':
        throw new Error(error.message)
      default:
        throw new Error('Error al crear la tarea')
    }
  }
}

/**
 * Elimina una tarea por ID
 * @async
 * @param {string} id - ID de la tarea a eliminar
 * @returns {Promise<Object>} Resultado de la eliminación
 * @throws {Error} Si el ID no es válido
 * @throws {Error} Si hay un error en la petición HTTP
 * @example
 * // Eliminar una tarea
 * const result = await deleteTask('123')
 */
async function deleteTask(id) {
  try {
    if (!id || typeof id !== 'string') {
      throw new Error('ID de tarea inválido', {
        cause: 'INVALID_TASK_ID'
      })
    }

    const { data } = await taskRepository.deleteTask(id)
    
    if (!data) {
      throw new Error('No se pudo eliminar la tarea')
    }
    
    return data
  } catch (error) {
    switch (error.cause) {
      case 'INVALID_TASK_ID':
        throw new Error(error.message)
      default:
        throw new Error('Error al eliminar la tarea')
    }
  }
}

/**
 * Marca una tarea como LATE
 * @async
 * @param {string} id - ID de la tarea a marcar como LATE
 * @returns {Promise<Object>} Tarea actualizada
 * @throws {Error} Si el ID no es válido
 * @throws {Error} Si hay un error en la petición HTTP
 * @example
 * // Marcar tarea como LATE
 * const updatedTask = await markTaskAsLate('123')
 */
async function markTaskAsLate(id) {
  try {
    if (!id || typeof id !== 'string') {
      throw new Error('ID de tarea inválido', {
        cause: 'INVALID_TASK_ID'
      })
    }

    const { data } = await taskRepository.markTaskAsLate(id)
    
    if (!data) {
      throw new Error('No se pudo marcar la tarea como LATE')
    }
    
    return data
  } catch (error) {
    switch (error.cause) {
      case 'INVALID_TASK_ID':
        throw new Error(error.message)
      default:
        throw new Error('Error al marcar la tarea como LATE')
    }
  }
}

/**
 * Obtiene tareas por estado
 * @async
 * @param {string} status - Estado de las tareas a obtener ('ON_TIME', 'LATE')
 * @returns {Promise<Array>} Lista de tareas filtradas por estado
 * @throws {Error} Si el estado no es válido
 * @throws {Error} Si no se recibieron tareas válidas
 * @throws {Error} Si hay un error en la petición HTTP
 * @example
 * // Obtener tareas a tiempo
 * const onTimeTasks = await fetchTasksByStatus('ON_TIME')
 *
 * // Obtener tareas tardías
 * const lateTasks = await fetchTasksByStatus('LATE')
 */
async function fetchTasksByStatus(status) {
  try {
    const validStatuses = ['ON_TIME', 'LATE']
    
    if (!validStatuses.includes(status)) {
      throw new Error(`Estado "${status}" no es válido. Debe ser "ON_TIME" o "LATE".`, {
        cause: 'INVALID_STATUS'
      })
    }

    const { data } = await taskRepository.getTasksByStatus(status)
    
    if (!data || !Array.isArray(data)) {
      throw new Error(`No se recibieron tareas válidas para el estado: ${status}`)
    }
    
    return data
  } catch (error) {
    switch (error.cause) {
      case 'INVALID_STATUS':
        throw new Error(error.message)
      default:
        throw new Error('Error al obtener las tareas por estado')
    }
  }
}

module.exports = {
  fetchTasks,
  createTask,
  deleteTask,
  markTaskAsLate,
  fetchTasksByStatus
}