// Middleware para manejar solicitudes POST y PUT en list-edit-router
function validateTaskData(req, res, next) {
    if (req.method === "POST" || req.method === "PUT") {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Cuerpo de solicitud vacío." });
      }
  
      // Agrega aquí tus validaciones específicas para los atributos de las tareas
      // Ejemplo: si 'Title' es obligatorio
      if (!req.body.Title) {
        return res.status(400).json({ error: "Falta el atributo 'Title' en la solicitud." });
      }
  
      // Continúa con otras validaciones según tus necesidades
    }
  
    next();
  }
  
  module.exports = validateTaskData;
  