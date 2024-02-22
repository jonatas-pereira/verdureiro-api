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
exports.ProductsRepository = void 0;
const client_1 = require("../../../prisma/client");
class ProductsRepository {
    create({ name, description, category, price, quantity, images, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield client_1.prisma.product.create({
                data: {
                    name,
                    description,
                    category,
                    price,
                    quantity,
                    images,
                    userId
                }
            });
            return products;
        });
    }
    update({ id, name, description, category, price, quantity, images }) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield client_1.prisma.product.update({
                where: {
                    id
                },
                data: {
                    name,
                    description,
                    category,
                    price,
                    quantity,
                    images
                }
            });
            return product;
        });
    }
    delete({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield client_1.prisma.product.delete({
                where: {
                    id
                }
            });
            return product;
        });
    }
    findById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield client_1.prisma.product.findUnique({
                where: {
                    id: productId
                }
            });
            return product;
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield client_1.prisma.product.findUnique({
                where: {
                    name: name
                }
            });
            return product;
        });
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield client_1.prisma.product.findMany({
                orderBy: {
                    name: "asc"
                }
            });
            return products;
        });
    }
    incrementProduct(productId, quantityReservation) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield client_1.prisma.product.update({
                where: {
                    id: productId
                },
                data: {
                    quantity: {
                        increment: quantityReservation
                    }
                }
            });
        });
    }
    decrementProduct(productId, quantityCancellation) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield client_1.prisma.product.update({
                where: {
                    id: productId
                },
                data: {
                    quantity: {
                        decrement: quantityCancellation,
                    }
                }
            });
        });
    }
}
exports.ProductsRepository = ProductsRepository;
//# sourceMappingURL=ProductsRepository.js.map