import { inject, injectable } from "tsyringe";
import { IReservationsRepository } from "../../repositories/IReservationsRepository";
import { Reservation } from "@prisma/client";
import { ShowReservationsDTO } from "../../dtos/ShowReservationsDTO";
import AppError from "../../../../shared/errors/AppError";

@injectable()
export class ShowReservationUseCase{
  constructor(
    @inject("ReservationsRepository")
    private reservationRepository: IReservationsRepository
  ) { }

  async execute({ reservationId}: ShowReservationsDTO): Promise<Reservation>{

    const reservation = await this.reservationRepository.findById(reservationId);
    if (!reservation) {
      throw new AppError("Reservation not found");
    }

    return reservation;
  }
}
