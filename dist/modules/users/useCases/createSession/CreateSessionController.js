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
exports.CreateSessionController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateSessionUseCase_1 = require("./CreateSessionUseCase");
class CreateSessionController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const createSessionUseCase = tsyringe_1.container.resolve(CreateSessionUseCase_1.CreateSessionUseCase);
            const { email, password } = request.body;
            const { user, acessToken } = yield createSessionUseCase.execute({
                email,
                password
            });
            return response.status(200).json({
                user,
                acessToken
            });
        });
    }
}
exports.CreateSessionController = CreateSessionController;
//# sourceMappingURL=CreateSessionController.js.map