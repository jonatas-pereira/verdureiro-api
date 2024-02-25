import { CreateReservationDTO } from "../dtos/CreateReservationsDTO";
import { DeleteReservationDTO } from "../dtos/DeleteReservationsDTO";
import { IReservationsRepository } from "./IReservationsRepository";
import { Reservation } from "@prisma/client";
import { prisma } from "../../../prisma/client";

export class ReservationsRepository implements IReservationsRepository {
  async create({ name, email, address, quantityReservation, totalPrice, active, contact, productId }: CreateReservationDTO): Promise<Reservation> {
    const resersation = await prisma.reservation.create({
      data: {
        name,
        email,
        address,
        quantityReservation,
        totalPrice,
        active,
        contact,
        productId
      },
      include: {
        id_product: true
      }
    });

    return resersation;
  }

  async delete({ id }: DeleteReservationDTO): Promise<Reservation> {
    const reservation = await prisma.reservation.delete({
      where: {
        id,
      },
      include: {
        id_product: true
      }
    });

    return reservation;
  }

  async findById(reservationId: string): Promise<Reservation | null> {
    const reservation = await prisma.reservation.findUnique({
      where: {
        id: reservationId,
      },
      include: {
        id_product: true
      }
    });

    return reservation;
  }

  async getAllReservations(): Promise<Reservation[] | null> {
    const reservation = await prisma.reservation.findMany({
      orderBy: {
        name: "asc"
      },
      include: {
        id_product: true
      }
    });

    return reservation
  }
}
