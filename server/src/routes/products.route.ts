import { Router } from 'express';
import ProductsController from '@/controllers/products.controller';
import { CreateProductDto } from '@/dtos/products.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddlewareAdmin from '@/middlewares/auth.middleware.admin';

class ProductsRoute implements Routes {
  public path = '/products';
  public router = Router();
  public productsController = new ProductsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(`${this.path}`, this.productsController.getProducts);
    this.router.get(`${this.path}`, this.productsController.getProductsByFilter);
    this.router.get(`${this.path}/:id`, this.productsController.getProductById);
    this.router.post(
      `${this.path}`,
      // authMiddlewareAdmin,
      validationMiddleware(CreateProductDto, 'body'),
      this.productsController.createProduct,
    );
    this.router.put(
      `${this.path}/:id`,
      // authMiddlewareAdmin,
      validationMiddleware(CreateProductDto, 'body', true),
      this.productsController.updateProduct,
    );
    this.router.delete(
      `${this.path}/:id`,
      // authMiddlewareAdmin,
      this.productsController.deleteProduct,
    );
  }
}

export default ProductsRoute;
