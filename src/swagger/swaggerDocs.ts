import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
const swaggerOutPutFile = require('../swagger/swagger-output.json'); // Adjust the path as necessary


const swaggerDocs = (app: Application): void => {

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutPutFile, {
    explorer: true,
    swaggerOptions: {
      url: '/swagger-output.json',
      docExpansion: 'none',
      defaultModelsExpandDepth: -1,
      displayRequestDuration: true,
    },
    customSiteTitle: 'Product API Documentation'
  }));
  console.log(`📚 Swagger docs available at http://localhost:${process.env.PORT || 3000}/api-docs`);
};

export default swaggerDocs;