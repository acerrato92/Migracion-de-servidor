// Middleware para validar parámetros en list-view-router
function validateListViewParams(req, res, next) {
    const param1 = req.params.param1;
    const param2 = req.params.param2;
  
    // Agrega aquí tus validaciones específicas para los parámetros de la ruta
    // Ejemplo: si ambos parámetros son obligatorios
    if (!param1 || !param2) {
      return res.status(400).send("Faltan parámetros en la solicitud.");
    }
  
    // Continúa con otras validaciones según tus necesidades
  
    next();
  }
  
  module.exports = validateListViewParams;
  