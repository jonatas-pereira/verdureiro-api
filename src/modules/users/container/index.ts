import { container } from "tsyringe";
import { IUserRepository } from "../repositories/IUserRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateUserController } from "../useCases/createUser/CreateUserController";
import { CreateSessionController } from "../useCases/createSession/CreateSessionController";
import { ShowProfileController } from "../useCases/showProfile/ShowProfileController";
import { DeleteProfileController } from "../useCases/deleteProfile/DeleteProfile.controller";
import { UpdateProfileController } from "../useCases/updateProfile/UpdateProfileController";

container.registerSingleton<IUserRepository>(
  "UsersRepository",
  UserRepository
);

container.registerSingleton<CreateUserController>(
  "CreateUserController",
  CreateUserController
);

container.registerSingleton<CreateSessionController>(
  "CreateSessionController",
  CreateSessionController
);

container.registerSingleton<ShowProfileController>(
  "ShowProfileController",
  ShowProfileController
);

container.registerSingleton<DeleteProfileController>(
  "DeleteProfileController",
  DeleteProfileController
);

container.registerSingleton<UpdateProfileController>(
  "UpdateProfileController",
  UpdateProfileController
);
