import mongoose from "mongoose";

import dotenv from 'dotenv';
dotenv.config();

const MONGODB_STRING = process.env.MONGODB_STRING;
const database = async () => {
  try {
    if (!MONGODB_STRING) {
      throw new Error("Falta la variable de entorno MONGODB_STRING");
    }
    await mongoose.connect(MONGODB_STRING);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectarse a MongoDB', error);
    process.exit(1);
  }
};

export { database, mongoose };
export default database;