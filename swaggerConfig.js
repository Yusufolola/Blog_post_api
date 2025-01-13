const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog POST API',
      version: '1.0.0',
      description: 'API Documentation for the Blog Project',
      contact: {
        name: 'Oyesanmi Yusuf',
        email: 'yusufoyesanmi@yahoo.com',
      },
    },
    servers: [
      {
        url: 'http://127.0.0.1:8000/api/v1', 
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
