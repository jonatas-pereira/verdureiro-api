import { CreateProductsDTO } from "../dtos/CreateProductsDTO";
import { UpdateProductsDTO } from "../dtos/UpdateProdutsDTO";
import { IProductsRepository } from "./IProductsRepository";
import { Product } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { DeleteProductsDTO } from "../dtos/DeleteProductDTO";

export class ProductsRepository implements IProductsRepository{
  async create({ name, description, category, price, quantity, images, userId }: CreateProductsDTO): Promise<Product> {
    const products = await prisma.product.create({
      data: {
        name,
        description,
        category,
        price,
        quantity,
        images,
        userId
      }
    });
    return products;
  }
  async update({ id, name, description, category, price, quantity, images }: UpdateProductsDTO): Promise<Product> {
    const product = await prisma.product.update({
      where: {
        id
      },
      data: {
        name,
        description,
        category,
        price,
        quantity,
        images
      }
    });

    return product;
  }
  async delete({ id }: DeleteProductsDTO): Promise<Product> {
    const product = await prisma.product.delete({
      where: {
        id
      }
    });

    return product;
  }
  async findById(productId: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        id: productId
      }
    });

    return product;
  }
  async findByName(name: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        name: name
      }
    });

    return product;
  }

  async getAllProducts(): Promise<Product[] | null>{
    const products = await prisma.product.findMany({
      orderBy: {
        name: "asc"
      }
    });

    return products;
  }

  async incrementProduct(productId: string, quantityReservation: number): Promise<void> {
    const product = await prisma.product.update({
      where: {
        id: productId
      },
      data: {
        quantity: {
          increment: quantityReservation
        }
      }
    });
  }

  async decrementProduct(productId: string, quantityCancellation: number): Promise<void> {
    const product = await prisma.product.update({
      where: {
        id: productId
      },
      data: {
        quantity: {
          decrement: quantityCancellation,
        }
      }
    });
  }
}

