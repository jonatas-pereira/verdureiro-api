import { Joi, Segments, celebrate } from "celebrate";
import { Router } from "express";
import isAuthenticate from "../../../../shared/http/middlewares/isAtuthenticate";
import { container } from "tsyringe";
import { CreateProductController } from "../../useCases/createProducts/CreateProductController";
import multer from "multer";
import { uploadImageProduct } from "../../../../shared/services/firebase";
import { ListProductController } from "../../useCases/listProducts/ListProductController";
import { DeleteProductController } from "../../useCases/deleteProducts/DeleteProductController";
import { ShowProductController } from "../../useCases/showProducts/ShowProductController";
import { UpdateProductController } from "../../useCases/updateProducts/UpdateProductController";

const productsRoutes = Router();

// Recebendo imagem pelo multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024
  }
});

const createProductController = container.resolve(CreateProductController);
const listProductsController = container.resolve(ListProductController);
const showProductsController = container.resolve(ShowProductController);
const updateProductController = container.resolve(UpdateProductController);
const deleteProductController = container.resolve(DeleteProductController);

productsRoutes.get("/", listProductsController.handle);

productsRoutes.get("/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  isAuthenticate,
  showProductsController.handle
);
productsRoutes.post("/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      category: Joi.string().required() ,
      price: Joi.number().required(),
      quantity: Joi.number().required(),
      images: Joi.string(),
    }
  }),
  isAuthenticate,
  createProductController.handle
);

productsRoutes.patch("/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      description: Joi.string(),
      category: Joi.string(),
      price: Joi.number(),
      quantity: Joi.number(),
    }
  }),
  isAuthenticate,
  upload.single("images"),
  uploadImageProduct,
  updateProductController.handle
);

productsRoutes.delete("/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  isAuthenticate,
  deleteProductController.handle
);

export default productsRoutes;
