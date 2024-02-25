import { container } from "tsyringe";
import { IReservationsRepository } from "../repositories/IReservationsRepository";
import { ReservationsRepository } from "../repositories/ReservationsRepository";
import { CreateReservationController } from "../useCases/createReservations/CreateReservationController";
import { ListReservationController } from "../useCases/ListReservations/ListReservationController";
import { ShowReservationController } from "../useCases/ShowReservations/ShowReservationController";
import { DeleteReservationController } from "../useCases/deleteReservations/DeleteReservationController";
import { CancelReservationController } from "../useCases/cancelReservation/CancelReservatiooController";

container.registerSingleton<IReservationsRepository>(
  "ReservationsRepository",
  ReservationsRepository
);

container.registerSingleton<CreateReservationController>(
  "CreateReservationController",
  CreateReservationController
);

container.registerSingleton<ListReservationController>(
  "ListReservationController",
  ListReservationController
);

container.registerSingleton<ShowReservationController>(
  "ShowReservationController",
  ShowReservationController
);

container.registerSingleton<DeleteReservationController>(
  "DeleteReservationController",
  DeleteReservationController
);

container.registerSingleton<CancelReservationController>(
  "CancelReservationController",
  CancelReservationController
);
