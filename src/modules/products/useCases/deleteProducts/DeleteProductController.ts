import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteProductUseCase } from "./DeleteProductUseCase";

export class DeleteProductController{
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;
    const deleteProductUseCase = container.resolve(DeleteProductUseCase);

    const product = await deleteProductUseCase.execute({ id });

    return response.status(200).json({
      message: "Product deleted successfully",
      product
    });
  }
}
