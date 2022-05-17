import { CreateProductDto } from '@dtos/products.dto';
import { HttpException } from '@exceptions/HttpException';
import { Product } from '@/interfaces/interface';
import { productModel } from '@/models/model';
import { isEmpty } from '@utils/util';
import { v4 } from 'uuid';

class ProductService {
  public products = productModel;

  public async findAllProduct(): Promise<Product[]> {
    const products: Product[] = await this.products.aggregate([
      {
        $addFields: {
          countReviews: {
            $size: '$reviews',
          },
          totalStar: {
            $sum: '$reviews.star',
          },
        },
      },
      {
        $addFields: {
          avgStar: {
            $cond: [
              { $eq: ['$countReviews', 0] },
              0,
              { $divide: ['$totalStar', '$countReviews'] },
            ],
          },
        },
      },
    ]);
    return products;
  }

  public async findProductByFilter(search: string): Promise<Product[]> {
    const products: Product[] = await this.products.aggregate([
      { $match: { $text: { $search: search } } },
      {
        $addFields: {
          countReviews: {
            $size: '$reviews',
          },
          totalStar: {
            $sum: '$reviews.star',
          },
        },
      },
      {
        $addFields: {
          avgStar: {
            $cond: [
              { $eq: ['$countReviews', 0] },
              0,
              { $divide: ['$totalStar', '$countReviews'] },
            ],
          },
        },
      },
    ]);
    return products;
  }

  public async findProductById(productId: string): Promise<Product> {
    if (isEmpty(productId)) throw new HttpException(400, "You're not productId");

    const findProduct: Product = await this.products.findOne({ id: productId });
    if (!findProduct) throw new HttpException(409, "You're not product");

    return findProduct;
  }

  public async createProduct(productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, "You're not productData");

    const createProductData: Product = await this.products.create({
      ...productData,
      id: v4(),
    });

    return createProductData;
  }

  public async updateProduct(
    productId: string,
    productData: CreateProductDto,
  ): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, "You're not productData");

    const updateProductById: Product = await this.products.findOneAndUpdate(
      { id: productId },
      productData,
    );
    if (!updateProductById) throw new HttpException(409, "You're not product");

    return updateProductById;
  }

  public async deleteProduct(productId: string): Promise<Product> {
    const deleteProductById: Product = await this.products.findOneAndDelete({
      id: productId,
    });
    if (!deleteProductById) throw new HttpException(409, "You're not product");

    return deleteProductById;
  }
}

export default ProductService;
