
const express = require("express");
const app = express(); 
const task = require("./task.json");
const port = 3001;
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config(); // Cargar variables de entorno

app.use(bodyParser.json());

// Lista de tareas (simulada como un arreglo; en una aplicación real, deberías usar una base de datos)
let tasks = [
  { id: 1, description: 'Tarea 1', isCompleted: false },
  { id: 2, description: 'Tarea 2', isCompleted: true },
  // Agrega más tareas aquí
];

// Endpoint para crear una nueva tarea
app.post('/tasks', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.status(201).json(newTask); // Código 201 (Created) para indicar que se creó una nueva tarea
});

// Endpoint para listar todas las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Endpoint para obtener una sola tarea por su ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' }); // Código 404 (Not Found)
  }
  res.json(task);
});

// Endpoint para actualizar una tarea por su ID
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
});

// Endpoint para eliminar una tarea por su ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  tasks.splice(taskIndex, 1);
  res.sendStatus(204); // Código 204 (No Content) para indicar que se eliminó la tarea
});

// Endpoint para listar tareas completas
app.get('/tasks/completed', (req, res) => {
  const completedTasks = tasks.filter(t => t.isCompleted);
  res.json(completedTasks);
});

// Endpoint para listar tareas incompletas
app.get('/tasks/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(t => !t.isCompleted);
  res.json(incompleteTasks);
});


// Ruta de autenticación para generar un token JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Buscar el usuario en el array (debería verificar en una base de datos real)
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  // Generar un token JWT
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);

  res.json({ token });
});

// Ruta protegida que requiere autenticación
app.get('/ruta-protegida', (req, res) => {
  // Verificar el token en el encabezado de autorización
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ mensaje: 'Acceso concedido', usuario: decoded.username });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

// Resto de la configuración de tu servidor

app.listen(3000, () => {
  console.log('Servidor Express en ejecución en el puerto 3000');
});
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