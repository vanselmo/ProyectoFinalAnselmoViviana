import errorTypes from '../services/errorDictionary.js';

const errorHandler = (err, req, res, next) => {
    const error = errorTypes[err.type] || { code: 500, message: 'Error interno del servidor' };
    res.status(error.code).json({ error: error.message });
};

export default errorHandler;