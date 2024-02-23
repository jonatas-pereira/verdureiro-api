import { CreateUserController } from "../../useCases/createUser/CreateUserController";
import { Joi, Segments, celebrate } from "celebrate";
import { Router } from "express";
import { container } from "tsyringe";
import { ShowProfileController } from "../../useCases/showProfile/ShowProfileController";
import isAuthenticate from "../../../../shared/http/middlewares/isAtuthenticate";
import { DeleteProfileController } from "../../useCases/deleteProfile/DeleteProfile.controller";
import { UpdateProfileController } from "../../useCases/updateProfile/UpdateProfileController";

const usersRoutes = Router();

const createUserController = container.resolve(CreateUserController);
const showProfileController = container.resolve(ShowProfileController);
const deleteProfileController = container.resolve(DeleteProfileController);
const updateProfileController = container.resolve(UpdateProfileController);

usersRoutes.get("/profile",
  isAuthenticate,
  showProfileController.handle
);

usersRoutes.post("/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
      avatar: Joi.string(),
      contact: Joi.string().required(),
    }
  }),

  createUserController.handle
);

usersRoutes.patch("/profile",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      contact: Joi.string(),
    }
  }),
  isAuthenticate,
  updateProfileController.handle
);

usersRoutes.delete("/profile",
  isAuthenticate,
  deleteProfileController.handle
);

export default usersRoutes;
