"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateProductUseCase_1 = require("./CreateProductUseCase");
class CreateProductController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const createProductUseCase = tsyringe_1.container.resolve(CreateProductUseCase_1.CreateProductUseCase);
            const { name, description, category, price, quantity, images } = request.body;
            const userId = request.user.id;
            const product = yield createProductUseCase.execute({
                name,
                description,
                category,
                price,
                quantity,
                images,
                userId
            });
            return response.status(201).json(product);
        });
    }
}
exports.CreateProductController = CreateProductController;
//# sourceMappingURL=CreateProductController.js.map