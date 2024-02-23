"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const CreateSessionController_1 = require("../../useCases/createSession/CreateSessionController");
const sessionRoute = (0, express_1.Router)();
const createSessionController = tsyringe_1.container.resolve(CreateSessionController_1.CreateSessionController);
sessionRoute.post("/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required()
    }
}), createSessionController.handle);
exports.default = sessionRoute;
//# sourceMappingURL=session.routes.js.map