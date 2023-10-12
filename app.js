
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
const express = require('express');
const app = express();

app.use(express.json()); // Middleware para manejar JSON en solicitudes

// Importa los middleware
const validateTaskData = require('./list-edit-middleware');
const validateValidMethods = require('./http-method-middleware');
const validateListViewParams = require('./list-view-middleware');

// Implementa el middleware de nivel de aplicación para métodos HTTP válidos
app.use(validateValidMethods);

// Implementa los middleware en las rutas específicas
app.use('/list-view/:param1/:param2', validateListViewParams);

const listEditRouter = require('./list-edit-router');
const listViewRouter = require('./list-view-router');

// Implementa los routers en las rutas correspondientes
app.use('/list-edit', validateTaskData, listEditRouter);
app.use('/list-view', listViewRouter);

// Resto de la configuración de tu servidor

app.listen(3000, () => {
  console.log('Servidor Express en ejecución en el puerto 3000');
});