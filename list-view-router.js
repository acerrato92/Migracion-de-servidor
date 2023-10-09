const express = require("express");

const router = express.Router();

// Ruta para listar las tareas completadas
router.get("/completed", (req, res) => {
  // Obtener las tareas completadas
  const completedTasks = tasks.filter((task) => task.isCompleted);

  // Devolver las tareas en formato JSON
  res.json(completedTasks);
});

// Ruta para listar las tareas incompletas
router.get("/incomplete", (req, res) => {
  // Obtener las tareas incompletas
  const incompleteTasks = tasks.filter((task) => !task.isCompleted);

  // Devolver las tareas en formato JSON
  res.json(incompleteTasks);
});

module.exports = router;
