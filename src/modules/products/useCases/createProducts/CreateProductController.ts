import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProductUseCase } from "./CreateProductUseCase";

export class CreateProductController{
  async handle(request: Request, response: Response ): Promise<Response>{
    const createProductUseCase = container.resolve(CreateProductUseCase);
    const { name, description, category, price, quantity, images} = request.body;

    const userId = request.user.id;

    const product = await createProductUseCase.execute({
      name,
      description,
      category,
      price,
      quantity,
      images,
      userId
    });

    return response.status(201).json(product);
  }
}
