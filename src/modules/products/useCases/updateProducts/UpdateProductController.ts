import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProductUseCase } from "./UpdateProductUseCase";

export class UpdateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateProductUseCase = container.resolve(UpdateProductUseCase);
    const { id } = request.params;
    const images = request.file?.firebaseUrl as string;
    const { name, description, category, price, quantity } = request.body;

    const quantityParserInt = parseInt(quantity, 10);

    const product = await updateProductUseCase.execute({
      id,
      name,
      description,
      category,
      price,
      quantity: quantityParserInt,
      images
    });

    return response.status(201).json({
      message: "Product updated successfully",
      product
    });
  }
}
