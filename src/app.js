import express from "express";
import morgan from "morgan";
import cors from "cors";
import gatewayRouters from "./routes/gateway.routes.js";
import swaggerUi from "swagger-ui-express";
import { openapiSpecification } from "./config/swagger.js";

const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: true,
    url: ["http://localhost:4200"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

// Routes
app.use("/", gatewayRouters);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

export default app;
