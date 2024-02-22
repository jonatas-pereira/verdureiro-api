import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../../repositories/IProductsRepository";
import { Product } from "@prisma/client";
import AppError from "../../../../shared/errors/AppError";

@injectable()
export class ListProductUseCase{
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
  ) { }

  async execute(): Promise<Product[]>{

    const products = await this.productsRepository.getAllProducts();
    if (!products) {
      throw new AppError("Products not Found")
    }
    return products;
  }
}
