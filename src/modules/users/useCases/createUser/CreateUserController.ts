import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController{
  async handle(request: Request, response: Response): Promise<Response>{
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const { email, name, password, avatar, contact } = request.body;

    const user = await createUserUseCase.execute({
      email,
      name,
      password,
      avatar,
      contact,
    });

    return response.status(201).json(user);
  }
}
