import { container } from "tsyringe";
import { CancelReservationUseCase } from "./CancelReservationUseCase";
import { Request, Response } from "express";

export class CancelReservationController{
  async handle(request: Request, response: Response): Promise<Response> {
    const cancelReservationUseCase = container.resolve(CancelReservationUseCase);
    const { id } = request.params;

    const reservation = await cancelReservationUseCase.execute({ id });

    return response.status(200).json({
      message: "Reservation successfully deleted",
      reservation
    });
  }
}
