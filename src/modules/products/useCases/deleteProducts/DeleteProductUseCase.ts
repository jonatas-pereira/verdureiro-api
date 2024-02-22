import { Product } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { DeleteProductsDTO } from "../../dtos/DeleteProductDTO";
import AppError from "../../../../shared/errors/AppError";
import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
export class DeleteProductUseCase{
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
  ) { }

  async execute({ id }: DeleteProductsDTO): Promise<Product>{
    const productExists = await this.productsRepository.findById(id);
    if (!productExists) {
      throw new AppError("Product not found");
    }

    const product = await this.productsRepository.delete({ id });

    return product;
  }
}
