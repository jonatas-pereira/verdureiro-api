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
exports.ReservationsRepository = void 0;
const client_1 = require("../../../prisma/client");
class ReservationsRepository {
    create({ name, email, address, quantityReservation, totalPrice, active, contact, productId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const resersation = yield client_1.prisma.reservation.create({
                data: {
                    name,
                    email,
                    address,
                    quantityReservation,
                    totalPrice,
                    active,
                    contact,
                    productId
                },
                include: {
                    id_product: true
                }
            });
            return resersation;
        });
    }
    delete({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservation = yield client_1.prisma.reservation.delete({
                where: {
                    id,
                },
                include: {
                    id_product: true
                }
            });
            return reservation;
        });
    }
    findById(reservationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservation = yield client_1.prisma.reservation.findUnique({
                where: {
                    id: reservationId,
                },
                include: {
                    id_product: true
                }
            });
            return reservation;
        });
    }
    getAllReservations() {
        return __awaiter(this, void 0, void 0, function* () {
            const reservation = yield client_1.prisma.reservation.findMany({
                orderBy: {
                    name: "asc"
                },
                include: {
                    id_product: true
                }
            });
            return reservation;
        });
    }
}
exports.ReservationsRepository = ReservationsRepository;
//# sourceMappingURL=ReservationsRepository.js.map