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
exports.ShowReservationController = void 0;
const tsyringe_1 = require("tsyringe");
const ShowReservationUseCase_1 = require("./ShowReservationUseCase");
class ShowReservationController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const showReservationUseCase = tsyringe_1.container.resolve(ShowReservationUseCase_1.ShowReservationUseCase);
            const { id } = request.params;
            const reservationId = id;
            const reservation = yield showReservationUseCase.execute({ reservationId });
            return response.status(200).json(reservation);
        });
    }
}
exports.ShowReservationController = ShowReservationController;
//# sourceMappingURL=ShowReservationController.js.map