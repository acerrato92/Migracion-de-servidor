
const express = require("express");
const app = express(); 
const task = require("./task.json");
const port = 3001;

const Task = {
  id: "",
  isCompleted: false,
  description: "",
};

// Crear un arreglo de tareas
const tasks = [
  new Task({ id: "123456", isCompleted: false, description: "Walk the dog" }),
  new Task({ id: "789012", isCompleted: true, description: "Go to the grocery store" }),
];

// Crear una ruta para listar las tareas
app.get("/tasks", (req, res) => {
  // Devolver el arreglo de tareas en formato JSON
  res.json(tasks);
});

app.get("/", (req, res) => {
    res.send("primer servidor")
  });
  
app.get("/task", (req, res) => {
  res.send({
    succes:true,
    content:task
  
})
});


app.use(express.json());
app.listen(port, () => {
    console.log("server runing on port 3001");
});