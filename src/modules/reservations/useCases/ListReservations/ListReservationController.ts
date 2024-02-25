import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListReservationUseCase } from "./ListReservationUseCase";

export class ListReservationController{
  async handle(request: Request, response: Response): Promise<Response>{
    const listReservationUseCase = container.resolve(ListReservationUseCase);

    const reservatios = await listReservationUseCase.execute();

    return response.status(200).json(reservatios);
  }
}
