import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProductUseCase } from "./ListProductUseCase";

export class ListProductController{
  async handle(request: Request, response: Response): Promise<Response>{
    const listProductsUseCase = container.resolve(ListProductUseCase);
    const products = await listProductsUseCase.execute();
    return response.status(200).json(products);
  }
}
