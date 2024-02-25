"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const CreateReservationController_1 = require("../../useCases/createReservations/CreateReservationController");
const ListReservationController_1 = require("../../useCases/ListReservations/ListReservationController");
const isAtuthenticate_1 = __importDefault(require("../../../../shared/http/middlewares/isAtuthenticate"));
const ShowReservationController_1 = require("../../useCases/ShowReservations/ShowReservationController");
const DeleteReservationController_1 = require("../../useCases/deleteReservations/DeleteReservationController");
const CancelReservatiooController_1 = require("../../useCases/cancelReservation/CancelReservatiooController");
const reservationsRoutes = (0, express_1.Router)();
const createReservationController = tsyringe_1.container.resolve(CreateReservationController_1.CreateReservationController);
const listReservationController = tsyringe_1.container.resolve(ListReservationController_1.ListReservationController);
const showReservationController = tsyringe_1.container.resolve(ShowReservationController_1.ShowReservationController);
const deleteReservationController = tsyringe_1.container.resolve(DeleteReservationController_1.DeleteReservationController);
const cancelReservationController = tsyringe_1.container.resolve(CancelReservatiooController_1.CancelReservationController);
reservationsRoutes.get("/", isAtuthenticate_1.default, listReservationController.handle);
reservationsRoutes.get("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required()
    }
}), isAtuthenticate_1.default, showReservationController.handle);
reservationsRoutes.post("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().required().email(),
        address: celebrate_1.Joi.string().required(),
        quantityReservation: celebrate_1.Joi.number().required(),
        totalPrice: celebrate_1.Joi.number(),
        active: celebrate_1.Joi.boolean(),
        contact: celebrate_1.Joi.string().required()
    }
}), createReservationController.handle);
reservationsRoutes.delete("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required()
    }
}), isAtuthenticate_1.default, deleteReservationController.handle);
//Cancelando reserva no lado do cliente, usando get, pois é o único que o browser entende.
reservationsRoutes.get("/cancel/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required()
    }
}), cancelReservationController.handle);
exports.default = reservationsRoutes;
//# sourceMappingURL=reservations.routes.js.map