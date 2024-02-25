import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowReservationUseCase } from "./ShowReservationUseCase";

export class ShowReservationController{
  async handle(request: Request, response: Response): Promise<Response> {
    const showReservationUseCase = container.resolve(ShowReservationUseCase);
    const {id} = request.params;
    const reservationId = id;
    const reservation = await showReservationUseCase.execute({ reservationId });

    return response.status(200).json(reservation);
  }
}
