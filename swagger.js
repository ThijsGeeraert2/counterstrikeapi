const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json'
const endpointsFiles = ['./index.js']

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:8080'
};



/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, endpointsFiles, doc);