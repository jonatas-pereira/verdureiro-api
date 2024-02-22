import { Product } from "@prisma/client";
import { CreateProductsDTO } from "../dtos/CreateProductsDTO";
import { UpdateProductsDTO } from "../dtos/UpdateProdutsDTO";
import { DeleteProductsDTO } from "../dtos/DeleteProductDTO";

export interface IProductsRepository {
  create({ name, description, category, price, quantity,images,userId }: CreateProductsDTO): Promise<Product>;
  update({ id, name, description, category, price, quantity, images }: UpdateProductsDTO): Promise<Product>;
  delete({ id }: DeleteProductsDTO): Promise<Product>;
  findById(productId: string): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  getAllProducts(): Promise<Product[] | null>
  incrementProduct(productId: string, quantityReservation: number): Promise<void>;
  decrementProduct(productId: string, quantityCancellation: number): Promise<void>;
}
