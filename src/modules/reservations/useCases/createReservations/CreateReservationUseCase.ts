import { inject, injectable } from "tsyringe";
import { IReservationsRepository } from "../../repositories/IReservationsRepository";
import { IProductsRepository } from "../../../products/repositories/IProductsRepository";
import { Reservation } from "@prisma/client";
import { CreateReservationDTO } from "../../dtos/CreateReservationsDTO";
import AppError from "../../../../shared/errors/AppError";

@injectable()
export class CreateReservationUseCase {
  constructor(
    @inject("ReservationsRepository")
    private reservationsRepository: IReservationsRepository,

    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,

  ) { }

  async execute({ name, email,address, quantityReservation, totalPrice, active,contact, productId }: CreateReservationDTO): Promise<Reservation> {

    const productExists = await this.productsRepository.findById(productId);
    if (!productExists) {
      throw new AppError("Product not found");
    }

    if (quantityReservation > productExists.quantity) {
      throw new AppError("insufficient quantity of product", 400);
    }

    const total = quantityReservation * Number(productExists.price);

    const reservation = await this.reservationsRepository.create({
      name,
      email,
      address,
      quantityReservation,
      totalPrice: total,
      active,
      contact,
      productId
    });

    //Atualizando no banco de dados
    await this.productsRepository.decrementProduct(productId, quantityReservation);
    return reservation;
  }
}
