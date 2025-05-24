const swaggerAutogen = require('swagger-autogen')()



const doc = {
    info: {
        title: "Product API",
        description: "Description"
    },
    host: "http://localhost:3000/",
    schemes: ['http']
}

const outputFile = 'src/swagger/swagger-output.json'; // output file path
const routes = ['../route/*.ts', '../controllers/*.ts']; // add routes path 

// NOTE: if you use the express 'Router', you must pass in the 
// 'endpointsFiles' only the root file where the route starts.

swaggerAutogen(outputFile, routes, doc)



