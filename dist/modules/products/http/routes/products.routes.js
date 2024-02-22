"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const isAtuthenticate_1 = __importDefault(require("../../../../shared/http/middlewares/isAtuthenticate"));
const tsyringe_1 = require("tsyringe");
const CreateProductController_1 = require("../../useCases/createProducts/CreateProductController");
const multer_1 = __importDefault(require("multer"));
const firebase_1 = require("../../../../shared/services/firebase");
const ListProductController_1 = require("../../useCases/listProducts/ListProductController");
const DeleteProductController_1 = require("../../useCases/deleteProducts/DeleteProductController");
const ShowProductController_1 = require("../../useCases/showProducts/ShowProductController");
const UpdateProductController_1 = require("../../useCases/updateProducts/UpdateProductController");
const productsRoutes = (0, express_1.Router)();
// Recebendo imagem pelo multer
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024
    }
});
const createProductController = tsyringe_1.container.resolve(CreateProductController_1.CreateProductController);
const listProductsController = tsyringe_1.container.resolve(ListProductController_1.ListProductController);
const showProductsController = tsyringe_1.container.resolve(ShowProductController_1.ShowProductController);
const updateProductController = tsyringe_1.container.resolve(UpdateProductController_1.UpdateProductController);
const deleteProductController = tsyringe_1.container.resolve(DeleteProductController_1.DeleteProductController);
productsRoutes.get("/", listProductsController.handle);
productsRoutes.get("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    }
}), isAtuthenticate_1.default, showProductsController.handle);
productsRoutes.post("/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        description: celebrate_1.Joi.string().required(),
        category: celebrate_1.Joi.string().required(),
        price: celebrate_1.Joi.number().required(),
        quantity: celebrate_1.Joi.number().required(),
        images: celebrate_1.Joi.string(),
    }
}), isAtuthenticate_1.default, createProductController.handle);
productsRoutes.patch("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string(),
        description: celebrate_1.Joi.string(),
        category: celebrate_1.Joi.string(),
        price: celebrate_1.Joi.number(),
        quantity: celebrate_1.Joi.number(),
    }
}), isAtuthenticate_1.default, upload.single("images"), firebase_1.uploadImageProduct, updateProductController.handle);
productsRoutes.delete("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    }
}), isAtuthenticate_1.default, deleteProductController.handle);
exports.default = productsRoutes;
//# sourceMappingURL=products.routes.js.map