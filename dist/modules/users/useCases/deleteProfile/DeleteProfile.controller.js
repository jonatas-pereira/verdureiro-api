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
exports.DeleteProfileController = void 0;
const tsyringe_1 = require("tsyringe");
const DeleteProfileUseCase_1 = require("./DeleteProfileUseCase");
class DeleteProfileController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteProfileUseCase = tsyringe_1.container.resolve(DeleteProfileUseCase_1.DeleteProfileUseCase);
            const userId = request.user.id;
            const user = yield deleteProfileUseCase.execute({ userId });
            return response.status(200).json({
                message: "User deleted successfully",
                user
            });
        });
    }
}
exports.DeleteProfileController = DeleteProfileController;
//# sourceMappingURL=DeleteProfile.controller.js.map