const express = require('express');
const routes = require('./Routes/route.js');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require('./db/config');
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
app.listen(5000);