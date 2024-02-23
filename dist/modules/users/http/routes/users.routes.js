"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateUserController_1 = require("../../useCases/createUser/CreateUserController");
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const ShowProfileController_1 = require("../../useCases/showProfile/ShowProfileController");
const isAtuthenticate_1 = __importDefault(require("../../../../shared/http/middlewares/isAtuthenticate"));
const DeleteProfile_controller_1 = require("../../useCases/deleteProfile/DeleteProfile.controller");
const UpdateProfileController_1 = require("../../useCases/updateProfile/UpdateProfileController");
const usersRoutes = (0, express_1.Router)();
const createUserController = tsyringe_1.container.resolve(CreateUserController_1.CreateUserController);
const showProfileController = tsyringe_1.container.resolve(ShowProfileController_1.ShowProfileController);
const deleteProfileController = tsyringe_1.container.resolve(DeleteProfile_controller_1.DeleteProfileController);
const updateProfileController = tsyringe_1.container.resolve(UpdateProfileController_1.UpdateProfileController);
usersRoutes.get("/profile", isAtuthenticate_1.default, showProfileController.handle);
usersRoutes.post("/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        email: celebrate_1.Joi.string().email().required(),
        name: celebrate_1.Joi.string().required(),
        password: celebrate_1.Joi.string().required(),
        avatar: celebrate_1.Joi.string(),
        contact: celebrate_1.Joi.string().required(),
    }
}), createUserController.handle);
usersRoutes.patch("/profile", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string(),
        contact: celebrate_1.Joi.string(),
    }
}), isAtuthenticate_1.default, updateProfileController.handle);
usersRoutes.delete("/profile", isAtuthenticate_1.default, deleteProfileController.handle);
exports.default = usersRoutes;
//# sourceMappingURL=users.routes.js.map