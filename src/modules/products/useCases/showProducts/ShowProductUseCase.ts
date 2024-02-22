import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../../repositories/IProductsRepository";
import { Product } from "@prisma/client";
import { ShowProductDTO } from "../../dtos/ShowProductDTO";
import AppError from "../../../../shared/errors/AppError";

@injectable()
export class ShowProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
  ) { }

  async execute({ id }: ShowProductDTO): Promise<Product> {

    const productExists = await this.productsRepository.findById(id);
    if (!productExists) {
      throw new AppError("Product not found");
    }

    return productExists;
  }
}
