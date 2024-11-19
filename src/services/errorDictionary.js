const errorTypes = {
    USER_EXISTS: {
        code: 400,
        message: 'El usuario ya existe'
    },
    PET_NOT_FOUND: {
        code: 404,
        message: 'Mascota no encontrada'
    },
    INVALID_DATA: {
        code: 422,
        message: 'Los datos ingresados son invalidos'
    }
};

export default errorTypes;
