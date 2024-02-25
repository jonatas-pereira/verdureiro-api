"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const ReservationsRepository_1 = require("../repositories/ReservationsRepository");
const CreateReservationController_1 = require("../useCases/createReservations/CreateReservationController");
const ListReservationController_1 = require("../useCases/ListReservations/ListReservationController");
const ShowReservationController_1 = require("../useCases/ShowReservations/ShowReservationController");
const DeleteReservationController_1 = require("../useCases/deleteReservations/DeleteReservationController");
const CancelReservatiooController_1 = require("../useCases/cancelReservation/CancelReservatiooController");
tsyringe_1.container.registerSingleton("ReservationsRepository", ReservationsRepository_1.ReservationsRepository);
tsyringe_1.container.registerSingleton("CreateReservationController", CreateReservationController_1.CreateReservationController);
tsyringe_1.container.registerSingleton("ListReservationController", ListReservationController_1.ListReservationController);
tsyringe_1.container.registerSingleton("ShowReservationController", ShowReservationController_1.ShowReservationController);
tsyringe_1.container.registerSingleton("DeleteReservationController", DeleteReservationController_1.DeleteReservationController);
tsyringe_1.container.registerSingleton("CancelReservationController", CancelReservatiooController_1.CancelReservationController);
//# sourceMappingURL=index.js.map