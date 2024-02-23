"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../container/index");
require("dotenv/config");
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
//import reservationsRoutes from "../../modules/reservations/http/routes/reservations.routes";
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routa usários.
//app.use("/users", usersRoutes);
//app.use("/login", sessionRoute);
// Rotas produtos
//app.use("/products", productsRoutes);
// Rotas Reservas
//app.use("/reservations", reservationsRoutes);
//app.use(errors());
// Middleware validação de erros.
/*
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
*/
app.listen(port, () => {
    console.log(`Server is running in port: ${port}🚀`);
});
//# sourceMappingURL=server.js.map