import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateReservationUseCase } from "./CreateReservationUseCase";

export class CreateReservationController {
  async handle(request: Request, response: Response): Promise<Response> {

    const createReservationUseCase = container.resolve(CreateReservationUseCase);
    const { id } = request.params;
    const { name, email,address, quantityReservation, totalPrice, active, contact } = request.body;

    const reservation = await createReservationUseCase.execute({
      name,
      email,
      address,
      quantityReservation,
      totalPrice,
      active,
      contact,
      productId: id
    });

    return response.status(201).json({
      message: "reservation made successfully",
      reservation
    })
  }
}
