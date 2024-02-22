import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../../repositories/IProductsRepository";
import { Product } from "@prisma/client";
import { UpdateProductsDTO } from "../../dtos/UpdateProdutsDTO";
import AppError from "../../../../shared/errors/AppError";

@injectable()
export class UpdateProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
  ) { }

  async execute({ id, name, description, category, price, quantity, images }: UpdateProductsDTO): Promise<Product> {

    const productExists = await this.productsRepository.findById(id);
    if (!productExists) {
      throw new AppError("Product not found");
    }

    const productNameExists = await this.productsRepository.findByName(name);
    if (productNameExists) {
      throw new AppError("Product already exists that name")
    }

    const product = await this.productsRepository.update({
      id,
      name,
      description,
      category,
      price,
      quantity,
      images
    });

    return product;
  }
}
