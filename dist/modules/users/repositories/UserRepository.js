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
exports.UserRepository = void 0;
const client_1 = require("../../../prisma/client");
class UserRepository {
    create({ email, name, password, contact }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield client_1.prisma.user.create({
                data: {
                    email,
                    name,
                    password,
                    contact,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    password: false,
                    contact: true,
                    created_at: true,
                    update_at: true
                }
            });
            return user;
        });
    }
    update(userId, { name, contact }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield client_1.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    name,
                    contact,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    password: false,
                    contact: true,
                    created_at: true,
                    update_at: true
                }
            });
            return user;
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield client_1.prisma.user.delete({
                where: {
                    id: userId,
                }
            });
            return user;
        });
    }
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield client_1.prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    password: false,
                    contact: true,
                    created_at: true,
                    update_at: true
                }
            });
            return user;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield client_1.prisma.user.findUnique({
                where: {
                    email: email,
                }
            });
            return user;
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map