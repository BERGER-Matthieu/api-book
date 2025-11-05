// config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Bibliothèque',
      version: '1.0.0',
      description: 'Documentation de l’API REST de gestion des livres et auteurs',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur local',
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key',
          description: 'Clé API nécessaire pour accéder aux endpoints sécurisés',
        },
      },
    },
    security: [
      { ApiKeyAuth: [] },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('✅ Documentation Swagger disponible sur http://localhost:3000/docs');
}

module.exports = setupSwagger;
