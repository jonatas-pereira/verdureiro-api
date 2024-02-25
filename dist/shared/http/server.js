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
const AppError_1 = __importDefault(require("../errors/AppError"));
const celebrate_1 = require("celebrate");
const users_routes_1 = __importDefault(require("../../modules/users/http/routes/users.routes"));
const session_routes_1 = __importDefault(require("../../modules/users/http/routes/session.routes"));
const products_routes_1 = __importDefault(require("../../modules/products/http/routes/products.routes"));
const reservations_routes_1 = __importDefault(require("../../modules/reservations/http/routes/reservations.routes"));
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routa usários.
app.use("/users", users_routes_1.default);
app.use("/login", session_routes_1.default);
// Rotas produtos
app.use("/products", products_routes_1.default);
// Rotas Reservas
app.use("/reservations", reservations_routes_1.default);
app.use((0, celebrate_1.errors)());
// Middleware validação de erros.
app.use((error, request, response, next) => {
    if (error instanceof AppError_1.default) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message,
        });
    }
    // Interceptando o erro e mostrando no console.
    console.log(error);
    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});
app.listen(port, () => {
    console.log(`Server is running in port: ${port}🚀`);
});
//# sourceMappingURL=server.js.map