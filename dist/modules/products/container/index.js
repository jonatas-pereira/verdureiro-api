"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const ProductsRepository_1 = require("../repositories/ProductsRepository");
const CreateProductController_1 = require("../useCases/createProducts/CreateProductController");
const ListProductController_1 = require("../useCases/listProducts/ListProductController");
const DeleteProductController_1 = require("../useCases/deleteProducts/DeleteProductController");
const ShowProductController_1 = require("../useCases/showProducts/ShowProductController");
const UpdateProductController_1 = require("../useCases/updateProducts/UpdateProductController");
tsyringe_1.container.registerSingleton("ProductsRepository", ProductsRepository_1.ProductsRepository);
tsyringe_1.container.registerSingleton("CreateProductController", CreateProductController_1.CreateProductController);
tsyringe_1.container.registerSingleton("ListProductController", ListProductController_1.ListProductController);
tsyringe_1.container.registerSingleton("DeleteProductController", DeleteProductController_1.DeleteProductController);
tsyringe_1.container.registerSingleton("ShowProductController", ShowProductController_1.ShowProductController);
tsyringe_1.container.registerSingleton("UpdateProductController", UpdateProductController_1.UpdateProductController);
//# sourceMappingURL=index.js.map