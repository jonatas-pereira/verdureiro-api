import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowProductUseCase } from "./ShowProductUseCase";

export class ShowProductController{
  async handle(request: Request, response: Response): Promise<Response> {
    const showProductUseCase = container.resolve(ShowProductUseCase);
    const { id } = request.params;

    const product = await showProductUseCase.execute({ id })

    return response.status(200).json(product);
  }
}
