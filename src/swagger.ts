import swaggerAutogen from 'swagger-autogen';

// Types for documentation
interface Documentation {
  info: DocumentationInfo;
  host: string;
  schemes: string[];
}

interface DocumentationInfo {
  title: string;
  description: string;
}

const infoDoc: DocumentationInfo = {
  title: `REST API about Food`,
  description: `This web service provides knowledge about different food all over the world.`
};

const doc: Documentation = {
  info: infoDoc,
  host: `f00d-rest.onrender.com`,
  schemes: [`https`]
};

const outputFile: string = `./swagger.json`;
const endpointsFiles: string[] = [`./server.js`];

swaggerAutogen(outputFile, endpointsFiles, doc);
