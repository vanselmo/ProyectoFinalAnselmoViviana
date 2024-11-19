import express from 'express';
import cookieParser from 'cookie-parser';
import database from './utils/database.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import errorHandler from './middleware/errorHandler.js';
import mocksRouter from './routes/mocks.router.js';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();
const PORT = process.env.PORT || 8080;

database();

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter)

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on ${PORT}`))

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentación de la App de Adoptme",
            description: "App dedicada a encontrar la mejor familia para las mascotas"
        }
    },
    apis: ["./src/docs/**/*.yaml"],
}

const specs = swaggerJSDoc(swaggerOptions); 

app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));