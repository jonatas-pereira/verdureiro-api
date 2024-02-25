import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteReservationUseCase } from "./DeleteReservationUseCase";

export class DeleteReservationController{
  async handle(request: Request, response: Response): Promise<Response>{
    const deleteReservationUseCase = container.resolve(DeleteReservationUseCase);
    const { id } = request.params;

    const reservation = await deleteReservationUseCase.execute({ id });

    return response.status(200).json({
      message: "Reservation successfully deleted",
      reservation
    });
  }
}
