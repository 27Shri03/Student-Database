import express from 'express';
import routes from './Routes/route.js';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import './db/config.js';
dotenv.config({ path: '.env' });
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Student CRUD API",
        version: "1.0.0",
        description: "A simple Student database API"
      },
      servers: [
        {
          url: process.env.PORT
        }
      ]
    },
    apis: ["./Routes/route.js"]
}
const specs = swaggerJsDoc(options); 
const app = express(); 
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.json());
app.use(cors());
app.use('/', routes);
const server = app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

export default server;