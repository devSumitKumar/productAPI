const swaggerAutogen = require('swagger-autogen')()


const doc = {
    info: {
        title: "Product API",
        description: "Description"
    },
    host: "localhost:3000",
    schemes: ['http']
}

const outputFile = './path/swagger-output.json'
const routes = ['./path/endpointsUser.js', './path/endpointsBook.js']; // add routes path 

// NOTE: if you use the express 'Router', you must pass in the 
// 'endpointsFiles' only the root file where the route starts.

swaggerAutogen(outputFile, routes, doc)



