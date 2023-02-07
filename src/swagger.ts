import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: `REST API about Food`,
    description: `This web service provides knowledge about different food all over the world.`
  },
  host: `f00d-rest.onrender.com`,
  schemes: [`https`]
};

const outputFile = `./swagger.json`;
const endpointsFiles = [`./server.js`];

swaggerAutogen(outputFile, endpointsFiles, doc);
