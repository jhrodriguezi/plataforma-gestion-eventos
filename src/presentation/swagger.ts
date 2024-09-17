import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Plataforma Gestion Eventos",
      version: "1.0.0",
    },
  },
  apis: ["./src/presentation/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export { setupSwagger };