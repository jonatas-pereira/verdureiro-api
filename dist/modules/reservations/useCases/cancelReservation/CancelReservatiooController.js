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
exports.CancelReservationController = void 0;
const tsyringe_1 = require("tsyringe");
const CancelReservationUseCase_1 = require("./CancelReservationUseCase");
class CancelReservationController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const cancelReservationUseCase = tsyringe_1.container.resolve(CancelReservationUseCase_1.CancelReservationUseCase);
            const { id } = request.params;
            const reservation = yield cancelReservationUseCase.execute({ id });
            return response.status(200).json({
                message: "Reservation successfully deleted",
                reservation
            });
        });
    }
}
exports.CancelReservationController = CancelReservationController;
//# sourceMappingURL=CancelReservatiooController.js.map