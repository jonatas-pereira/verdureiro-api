import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../../repositories/IProductsRepository";
import { Product } from "@prisma/client";
import { CreateProductsDTO } from "../../dtos/CreateProductsDTO";
import AppError from "../../../../shared/errors/AppError";

@injectable()
export class CreateProductUseCase{
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
  ) { }

  async execute({ name, description, category, price, quantity, images, userId }: CreateProductsDTO): Promise<Product>{
    const productExists = await this.productsRepository.findByName(name);
    if (productExists) {
      throw new AppError("Product already exists");
    }

    const product = await this.productsRepository.create({
      name,
      description,
      category,
      price,
      quantity,
      images,
      userId
    });

    return product;
  }
}
