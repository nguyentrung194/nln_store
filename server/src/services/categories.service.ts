import { CreateCategoryDto } from '@/dtos/categories.dto';
import { HttpException } from '@exceptions/HttpException';
import { Category } from '@/interfaces/interface';
import { categoryModel } from '@/models/model';
import { isEmpty } from '@utils/util';
import { v4 } from 'uuid';

class CategoryService {
  public categories = categoryModel;

  public async findAllCategory(): Promise<Category[]> {
    const categories: Category[] = await this.categories.find();
    return categories;
  }

  public async findCategoryById(categoryId: string): Promise<Category> {
    if (isEmpty(categoryId)) throw new HttpException(400, "You're not categoryId");

    const findCategory: Category = await this.categories.findOne({ id: categoryId });
    if (!findCategory) throw new HttpException(409, "You're not category");

    return findCategory;
  }

  public async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    if (isEmpty(categoryData)) throw new HttpException(400, "You're not categoryData");

    const createCategoryData: Category = await this.categories.create({
      ...categoryData,
      id: v4(),
    });

    return createCategoryData;
  }

  public async updateCategory(
    categoryId: string,
    categoryData: CreateCategoryDto,
  ): Promise<Category> {
    if (isEmpty(categoryData)) throw new HttpException(400, "You're not categoryData");

    const updateCategoryById: Category = await this.categories.findOneAndUpdate(
      { id: categoryId },
      categoryData,
    );
    if (!updateCategoryById) throw new HttpException(409, "You're not category");

    return updateCategoryById;
  }

  public async deleteCategory(categoryId: string): Promise<Category> {
    const deleteCategoryById: Category = await this.categories.findOneAndDelete({
      id: categoryId,
    });
    if (!deleteCategoryById) throw new HttpException(409, "You're not category");

    return deleteCategoryById;
  }
}

export default CategoryService;
