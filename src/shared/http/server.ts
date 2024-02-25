import "reflect-metadata";
import "../container/index";
import "dotenv/config";
import "express-async-errors";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import { errors } from "celebrate";
import usersRoutes from "../../modules/users/http/routes/users.routes";
import sessionRoute from "../../modules/users/http/routes/session.routes";
import productsRoutes from "../../modules/products/http/routes/products.routes";
import reservationsRoutes from "../../modules/reservations/http/routes/reservations.routes";
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

// Routa usários.
app.use("/users", usersRoutes);
app.use("/login", sessionRoute);

// Rotas produtos
app.use("/products", productsRoutes);

// Rotas Reservas
app.use("/reservations", reservationsRoutes);
app.use(errors());

// Middleware validação de erros.
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }
  // Interceptando o erro e mostrando no console.
  console.log(error)
  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});


app.listen(port, () => {
  console.log(`Server is running in port: ${port}🚀`);
});