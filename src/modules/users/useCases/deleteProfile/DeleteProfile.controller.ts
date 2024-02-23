import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteProfileUseCase } from "./DeleteProfileUseCase";

export class DeleteProfileController{
  async handle(request: Request, response: Response): Promise<Response>{
    const deleteProfileUseCase = container.resolve(DeleteProfileUseCase);
    const userId = request.user.id;

    const user = await deleteProfileUseCase.execute({ userId });

    return response.status(200).json({
      message: "User deleted successfully",
      user
    })
  }
}
