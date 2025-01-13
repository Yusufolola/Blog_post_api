const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

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
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            isBlocked: { type: 'boolean' },
            role: { type: 'string', enum: ['Admin', 'Visitor', 'Editor'] },
          },
        },
        Post: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            content: { type: 'string' },
            category: { type: 'string' },
            author: { type: 'string' },
            likes: { type: 'array', items: { type: 'string' } },
          },
        },
        Comment: {
          type: 'object',
          properties: {
            post: { type: 'string', description: 'ID of the post' },
            user: { type: 'string', description: 'ID of the user' },
            content: { type: 'string', description: 'Content of the comment' },
          },
        },
        Category: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'Category title' },
            user: { type: 'string', description: 'User ID who created the category' },
          },
        },
      },
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.join(__dirname, 'routes', '**', '*.js')],
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
console.log(swaggerOptions.apis); 


module.exports = swaggerDocs;
