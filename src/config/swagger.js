import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerUi: {
    displayOperationId: false,
  },
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API Gateway",
      version: "1.0.0",
      description: "API Gateway for managing devices",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],

    // tags: [
    //   {
    //     name: "Gateway",
    //     description: "Operations related to Gateway",
    //   },
    //   {
    //     name: "Device",
    //     description: "Operations related to Devices",
    //   },
    //   // ...
    // ],
  },
  apis: ["src/routes/*.js"],
};
export const openapiSpecification = swaggerJSDoc(options);
