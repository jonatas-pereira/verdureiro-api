import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowProfileUseCasa } from "./ShowProfileUseCase";

export class ShowProfileController{
  async handle(request: Request, response: Response): Promise<Response>{
    const showProfileUseCase = container.resolve(ShowProfileUseCasa);
    const userId = request.user.id;

    const user = await showProfileUseCase.execute({ userId });

    return response.status(200).json(user);
  }
}
