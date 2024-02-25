import { Reservation } from "@prisma/client";
import { CreateReservationDTO } from "../dtos/CreateReservationsDTO";
import { DeleteReservationDTO } from "../dtos/DeleteReservationsDTO";

export interface IReservationsRepository {
  create({name, email, address, quantityReservation, totalPrice, active, contact, productId }: CreateReservationDTO): Promise<Reservation>;
  delete({ id }: DeleteReservationDTO): Promise<Reservation>;
  findById(reservationId: string): Promise<Reservation | null>;
  getAllReservations(): Promise<Reservation[] | null>
}
