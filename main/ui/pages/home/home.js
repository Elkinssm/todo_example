const TaskRepository = require("../../../data/atributes/app/repository/TaskRepository");

Page({
  data: {
    tasks: [],
    filteredTasks: [],
    loading: false,
    error: null,
    showModal: false,
    newTaskTitle: "",
    newTaskDescription: "",
    newTaskEta: "",
    currentFilter: "all",
    searchText: "",
    stats: { total: 0, onTime: 0, late: 0 },
  },

  onLoad() {
    console.log(" === PÁGINA CARGADA ===");
    try {
      console.log("Intentando crear TaskRepository...");
      console.log("TaskRepository disponible:", TaskRepository);

      if (!TaskRepository || typeof TaskRepository !== "function") {
        throw new Error("TaskRepository no es un constructor válido");
      }

      this.taskRepository = new TaskRepository();
      console.log(" TaskRepository creado exitosamente");
      this.loadTasks();
    } catch (error) {
      console.error(" Error al crear TaskRepository:", error);
      this.setData({
        error: "Error al inicializar la aplicación: " + error.message,
      });
    }
  },

  async loadTasks() {
    try {
      console.log("loadTasks() llamado desde home.js");
      this.setData({ loading: true, error: null });

      const result = await this.taskRepository.getTasks();
      console.log("Tareas cargadas en home.js:", result);

      const tasks = result.data || [];
      this.setData({
        tasks,
        filteredTasks: tasks,
        loading: false,
      });

      this.updateStats();
      this.filterTasks();
    } catch (error) {
      console.error("Error en loadTasks de home.js:", error);
      this.setData({
        error: error.message,
        loading: false,
      });
    }
  },

  async createTask() {
    try {
      console.log("createTask() llamado desde home.js");
      console.log(" Estado actual del formulario:", {
        title: this.data.newTaskTitle,
        description: this.data.newTaskDescription,
        eta: this.data.newTaskEta,
      });

      // Validación más detallada
      if (!this.data.newTaskTitle || !this.data.newTaskTitle.trim()) {
        console.log("Título vacío o undefined");
        this.setData({ error: "El título es requerido" });
        return;
      }

      if (
        !this.data.newTaskDescription ||
        !this.data.newTaskDescription.trim()
      ) {
        console.log(" Descripción vacía o undefined");
        this.setData({ error: "La descripción es requerida" });
        return;
      }

      if (!this.data.newTaskEta) {
        console.log("ETA vacía o undefined");
        this.setData({ error: "La fecha límite es requerida" });
        return;
      }

      console.log("Validación pasada, procediendo a crear tarea");

      this.setData({ loading: true, error: null });

      // Formatear la fecha ETA al formato ISO requerido
      const etaDate = new Date(this.data.newTaskEta);
      const etaISO = etaDate.toISOString();

      console.log("Fecha original:", this.data.newTaskEta);
      console.log(" Fecha convertida a ISO:", etaISO);

      const taskData = {
        title: this.data.newTaskTitle.trim(),
        description: this.data.newTaskDescription.trim(),
        eta: etaISO,
      };

      console.log(" Datos de tarea a crear:", taskData);
      console.log(" Llamando a taskRepository.createTask...");

      const result = await this.taskRepository.createTask(taskData);
      console.log(" Nueva tarea creada:", result);

      // Limpiar formulario
      this.setData({
        newTaskTitle: "",
        newTaskDescription: "",
        newTaskEta: "",
        showModal: false,
        loading: false,
      });

      console.log("Recargando tareas...");
      // Recargar tareas
      await this.loadTasks();
      console.log("Tareas recargadas exitosamente");
    } catch (error) {
      console.error("Error en createTask:", error);
      this.setData({
        error: error.message,
        loading: false,
      });
    }
  },

  async deleteTask(e) {
    try {
      const taskId = e.currentTarget.dataset.id;
      console.log("deleteTask() llamado con ID:", taskId);

      if (!taskId) {
        console.error("No se pudo obtener el ID de la tarea");
        return;
      }

      this.setData({ loading: true, error: null });

      await this.taskRepository.deleteTask(taskId);

      // Recargar tareas
      await this.loadTasks();
    } catch (error) {
      console.error("Error en deleteTask:", error);
      this.setData({
        error: error.message,
        loading: false,
      });
    }
  },

  async markTaskAsFinished(e) {
    try {
      const taskId = e.currentTarget.dataset.id;
      console.log("markTaskAsFinished() llamado con ID:", taskId);

      if (!taskId) {
        console.error("No se pudo obtener el ID de la tarea");
        return;
      }

      this.setData({ loading: true, error: null });

      await this.taskRepository.markTaskAsFinished(taskId);

      // Recargar tareas
      await this.loadTasks();
    } catch (error) {
      console.error("Error en markTaskAsFinished:", error);
      this.setData({
        error: error.message,
        loading: false,
      });
    }
  },

  async loadTasksByStatus(e) {
    try {
      const status = e.currentTarget.dataset.status;
      console.log("🔄 loadTasksByStatus() llamado con status:", status);

      if (!status) {
        console.error("No se pudo obtener el status");
        return;
      }

      this.setData({ loading: true, error: null, currentFilter: status });

      let result;
      if (status === "all") {
        result = await this.taskRepository.getTasks();
      } else {
        result = await this.taskRepository.getTasksByStatus(status);
      }

      const tasks = result.data || [];
      this.setData({
        filteredTasks: tasks,
        loading: false,
      });

      this.updateStats();
    } catch (error) {
      console.error("Error en loadTasksByStatus:", error);
      this.setData({
        error: error.message,
        loading: false,
      });
    }
  },

  filterTasks() {
    const { tasks, searchText, currentFilter } = this.data;

    let filtered = tasks;

    // Filtrar por estado
    if (currentFilter !== "all") {
      filtered = filtered.filter((task) => task.taskStatus === currentFilter);
    }

    // Filtrar por búsqueda
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
      );
    }

    this.setData({ filteredTasks: filtered });
  },

  onSearchInput(e) {
    this.setData({ searchText: e.detail.value });
    this.filterTasks();
  },

  updateStats() {
    const { tasks } = this.data;
    const stats = {
      total: tasks.length,
      onTime: tasks.filter((task) => task.taskStatus === "ON_TIME").length,
      late: tasks.filter((task) => task.taskStatus === "LATE").length,
    };

    this.setData({ stats });
  },

  showAddTaskModal() {
    console.log("showAddTaskModal() llamado");
    this.setData({
      showModal: true,
      error: null,
      newTaskTitle: "",
      newTaskDescription: "",
      newTaskEta: "",
    });
  },

  hideModal() {
    console.log("hideModal() llamado");
    this.setData({
      showModal: false,
      error: null,
      newTaskTitle: "",
      newTaskDescription: "",
      newTaskEta: "",
    });
  },

  onOverlayTap() {
    console.log(" onOverlayTap() llamado - Cerrar modal");
    this.hideModal();
  },

  onModalContentTap(e) {
    console.log(" onModalContentTap() llamado - Prevenir cierre");
    // Prevenir que el evento se propague al overlay
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    return false;
  },

  onInputTap(e) {
    console.log(" onInputTap() llamado - Prevenir cierre del modal");
    // Prevenir que el evento se propague al modal content
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    return false;
  },

  onTitleInput(e) {
    console.log(" onTitleInput() llamado con:", e.detail.value);
    this.setData({ newTaskTitle: e.detail.value });
  },

  onDescriptionInput(e) {
    console.log(" onDescriptionInput() llamado con:", e.detail.value);
    this.setData({ newTaskDescription: e.detail.value });
  },

  onEtaInput(e) {
    console.log(" onEtaInput() llamado con:", e.detail.value);
    this.setData({ newTaskEta: e.detail.value });
  },

  onInputBlur(e) {
    console.log("onInputBlur() llamado");
    // Prevenir que el modal se cierre cuando se pierde el foco
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
  },

  onInputFocus(e) {
    console.log("onInputFocus() llamado");
    // Prevenir que el modal se cierre cuando se enfoca un input
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
  },
});
