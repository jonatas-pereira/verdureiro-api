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
exports.CreateReservationController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateReservationUseCase_1 = require("./CreateReservationUseCase");
class CreateReservationController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const createReservationUseCase = tsyringe_1.container.resolve(CreateReservationUseCase_1.CreateReservationUseCase);
            const { id } = request.params;
            const { name, email, address, quantityReservation, totalPrice, active, contact } = request.body;
            const reservation = yield createReservationUseCase.execute({
                name,
                email,
                address,
                quantityReservation,
                totalPrice,
                active,
                contact,
                productId: id
            });
            return response.status(201).json({
                message: "reservation made successfully",
                reservation
            });
        });
    }
}
exports.CreateReservationController = CreateReservationController;
//# sourceMappingURL=CreateReservationController.js.map