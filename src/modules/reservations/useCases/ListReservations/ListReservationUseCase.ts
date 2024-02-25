import { inject, injectable } from "tsyringe";
import { IReservationsRepository } from "../../repositories/IReservationsRepository";
import AppError from "../../../../shared/errors/AppError";
import { Reservation } from "@prisma/client";

@injectable()
export class ListReservationUseCase{
  constructor(
    @inject("ReservationsRepository")
    private reservationRepository: IReservationsRepository
  ) { }

  async execute(): Promise<Reservation[]> {
    const reservations = await this.reservationRepository.getAllReservations();
    if (!reservations) {
      throw new AppError("Reservations not found");
    }

    return reservations;
  }
}
