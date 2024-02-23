"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const UserRepository_1 = require("../repositories/UserRepository");
const CreateUserController_1 = require("../useCases/createUser/CreateUserController");
const CreateSessionController_1 = require("../useCases/createSession/CreateSessionController");
const ShowProfileController_1 = require("../useCases/showProfile/ShowProfileController");
const DeleteProfile_controller_1 = require("../useCases/deleteProfile/DeleteProfile.controller");
const UpdateProfileController_1 = require("../useCases/updateProfile/UpdateProfileController");
tsyringe_1.container.registerSingleton("UsersRepository", UserRepository_1.UserRepository);
tsyringe_1.container.registerSingleton("CreateUserController", CreateUserController_1.CreateUserController);
tsyringe_1.container.registerSingleton("CreateSessionController", CreateSessionController_1.CreateSessionController);
tsyringe_1.container.registerSingleton("ShowProfileController", ShowProfileController_1.ShowProfileController);
tsyringe_1.container.registerSingleton("DeleteProfileController", DeleteProfile_controller_1.DeleteProfileController);
tsyringe_1.container.registerSingleton("UpdateProfileController", UpdateProfileController_1.UpdateProfileController);
//# sourceMappingURL=index.js.map