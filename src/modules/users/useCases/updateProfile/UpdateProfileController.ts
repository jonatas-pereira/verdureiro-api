import {Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProfileUseCase } from "./UpdateProfileUseCase";

export class UpdateProfileController{
  async handle(request: Request, response: Response): Promise<Response> {
    const updateProfileUseCase = container.resolve(UpdateProfileUseCase);
    const { name, contact } = request.body;
    const avatar = request.file?.filename as string;
    const userId = request.user.id;

    const user = await updateProfileUseCase.execute(
      { userId },
      {
        name,
        avatar,
        contact
      }
    );

    return response.status(200).json({
      message: "User updated successfully",
      user
    });
  }
}
