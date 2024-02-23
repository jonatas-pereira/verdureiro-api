import { Joi, Segments, celebrate } from "celebrate";
import { Router } from "express";
import { container } from "tsyringe";
import { CreateSessionController } from "../../useCases/createSession/CreateSessionController";

const sessionRoute = Router();

const createSessionController = container.resolve(CreateSessionController);

sessionRoute.post("/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  createSessionController.handle
);

export default sessionRoute;
