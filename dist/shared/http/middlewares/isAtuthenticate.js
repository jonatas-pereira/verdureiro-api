"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../../../config/auth"));
const isAuthenticate = (request, response, next) => {
    const authHeaders = request.headers.authorization;
    if (!authHeaders) {
        return response.status(401).json({
            error: true,
            code: "token.invalid",
            message: "Acess token not present",
        });
    }
    const [Bearer, token] = authHeaders.split(" ");
    if (!token) {
        return response.status(401).json({
            error: true,
            code: "token.invalid",
            message: "Acess token not present",
        });
    }
    try {
        const decodedToken = (0, jsonwebtoken_1.verify)(token, auth_1.default.jwt.secret);
        const { sub } = decodedToken;
        request.user = {
            id: sub
        };
        next();
    }
    catch (_a) {
        return response.status(401).json({
            error: true,
            code: "token.expired",
            message: "Acess token not presenta",
        });
    }
};
exports.default = isAuthenticate;
//# sourceMappingURL=isAtuthenticate.js.map