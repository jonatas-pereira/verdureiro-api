import { container } from "tsyringe";
import { IProductsRepository } from "../repositories/IProductsRepository";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { CreateProductController } from "../useCases/createProducts/CreateProductController";
import { ListProductController } from "../useCases/listProducts/ListProductController";
import { DeleteProductController } from "../useCases/deleteProducts/DeleteProductController";
import { ShowProductController } from "../useCases/showProducts/ShowProductController";
import { UpdateProductController } from "../useCases/updateProducts/UpdateProductController";

container.registerSingleton<IProductsRepository>(
  "ProductsRepository",
  ProductsRepository
);

container.registerSingleton<CreateProductController>(
  "CreateProductController",
  CreateProductController
);

container.registerSingleton<ListProductController>(
  "ListProductController",
  ListProductController
);

container.registerSingleton<DeleteProductController>(
  "DeleteProductController",
  DeleteProductController
);

container.registerSingleton<ShowProductController>(
  "ShowProductController",
  ShowProductController
);

container.registerSingleton<UpdateProductController>(
  "UpdateProductController",
  UpdateProductController
);
