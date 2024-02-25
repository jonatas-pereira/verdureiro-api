import { inject, injectable } from "tsyringe";
import { IReservationsRepository } from "../../repositories/IReservationsRepository";
import { IProductsRepository } from "../../../products/repositories/IProductsRepository";
import { DeleteReservationDTO } from "../../dtos/DeleteReservationsDTO";
import { Reservation } from "@prisma/client";
import AppError from "../../../../shared/errors/AppError";

@injectable()
export class DeleteReservationUseCase{
  constructor(
    @inject("ReservationsRepository")
    private reservationRepository: IReservationsRepository,

    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) { }

  async execute({ id }: DeleteReservationDTO): Promise<Reservation> {

    const reservation = await this.reservationRepository.findById(id);
    if (!reservation) {
      throw new AppError("Reservation not found");
    }

    await this.productsRepository.incrementProduct(reservation.productId, reservation.quantityReservation);
    await this.reservationRepository.delete({ id });
    return reservation;
  }
}
