import { Joi, Segments, celebrate } from "celebrate";
import { Router } from "express";
import { container } from "tsyringe";
import { CreateReservationController } from "../../useCases/createReservations/CreateReservationController";
import { ListReservationController } from "../../useCases/ListReservations/ListReservationController";
import isAuthenticate from "../../../../shared/http/middlewares/isAtuthenticate";
import { ShowReservationController } from "../../useCases/ShowReservations/ShowReservationController";
import { DeleteReservationController } from "../../useCases/deleteReservations/DeleteReservationController";
import { CancelReservationController } from "../../useCases/cancelReservation/CancelReservatiooController";

const reservationsRoutes = Router();

const createReservationController = container.resolve(CreateReservationController);
const listReservationController = container.resolve(ListReservationController);
const showReservationController = container.resolve(ShowReservationController)
const deleteReservationController = container.resolve(DeleteReservationController);
const cancelReservationController = container.resolve(CancelReservationController);

reservationsRoutes.get("/",
  isAuthenticate,
  listReservationController.handle
);

reservationsRoutes.get("/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  isAuthenticate,
  showReservationController.handle
);

reservationsRoutes.post("/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      address: Joi.string().required(),
      quantityReservation: Joi.number().required(),
      totalPrice: Joi.number(),
      active: Joi.boolean(),
      contact: Joi.string().required()
    }
  }),
  createReservationController.handle,
);

reservationsRoutes.delete("/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  isAuthenticate,
  deleteReservationController.handle
);


//Cancelando reserva no lado do cliente, usando get, pois é o único que o browser entende.
reservationsRoutes.get("/cancel/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  cancelReservationController.handle
);


export default reservationsRoutes;
