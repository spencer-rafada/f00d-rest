const swaggerAutogen = require(`swagger-autogen`)();

const doc = {
  info: {
    title: `REST API about Food`,
    description: `This web service provides knowledge about different food all over the world.`,
    host: `localhost:3030`,
    schemes: [`http`]
  }
};

const outputFile = `./swagger.json`;
const endpointsFiles = [`./server.js`];

swaggerAutogen(outputFile, endpointsFiles, doc);
