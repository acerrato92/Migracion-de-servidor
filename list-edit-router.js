const express = require("express");

const router = express.Router();

// Ruta para crear una tarea
router.post("/", (req, res) => {
  // Crear una nueva tarea
  const task = new Task({
    id: uuid.v4(),
    isCompleted: req.body.isCompleted,
    description: req.body.description,
  });

  // Agregar la tarea al arreglo de tareas
  tasks.push(task)
  });